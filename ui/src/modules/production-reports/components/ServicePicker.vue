<template>
  <v-autocomplete
      v-model="selectedServices"
      :items="allServices"
      :return-object="true"
      :single-line="true"
      item-title="description"
      item-value="id"
      hide-details
  >
    <template v-slot:item="attrs">
      <v-list-item v-bind="attrs.props" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import {computed, onMounted, PropType, ref} from "vue";
import {Service, ServiceGroup} from "@/models/service";
import {useServicesStore} from "@/stores/services";

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: { type: Object as PropType<Array<Service>>, required: true }
});

const selectedServices = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const allServices = ref<Service[]>([]);
const serviceStore = useServicesStore();

async function loadServices() {
  const list = [];
  serviceStore.serviceGroups.forEach((group: ServiceGroup) => group.services.forEach((service: Service) => list.push(service)));
  allServices.value = list;
}

onMounted(() => {
  loadServices();
});
</script>

<style scoped>

</style>