<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Nombre" required>
        <v-text-field
          v-model="serviceType.name"
          placeholder="Inserte el nombre"
          :hide-details="typeof errors.name === 'undefined'"
          :error-messages="errors.name"
        />
      </custom-input>
    </responsive-form-field>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { type ServiceType } from '@/models/service-type';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';

const props = defineProps<{
  modelValue: ServiceType;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const serviceType = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
