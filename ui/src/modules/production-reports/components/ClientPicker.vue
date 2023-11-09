<template>
  <v-autocomplete
    v-model="selectedClients"
    :items="allClients"
    :return-object="true"
    :single-line="true"
    item-title="officialName"
    item-value="code"
    hide-details
  >
    <template v-slot:item="attrs">
      <v-list-item v-bind="attrs.props" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import { Client } from '@/models/client';
import { useClientsStore } from '@/stores/clients';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: Object as PropType<Array<Client>>, required: true },
});

const selectedClients = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const allClients = ref<Client[]>([]);
const clientStore = useClientsStore();

async function loadClients() {
  const list = [];
  clientStore.clients.forEach((client: Client) => list.push(client));
  allClients.value = list;
}

onMounted(() => {
  loadClients();
});
</script>

<style scoped></style>
