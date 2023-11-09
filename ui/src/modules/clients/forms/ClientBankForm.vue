<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Cuenta bancaria en CUP">
        <v-text-field placeholder="Inserte la cuenta bancaria en CUP" v-model="client.bankAccount" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Nombre de la cuenta">
        <v-text-field placeholder="Inserte el nombre de la cuenta" v-model="client.accountName" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Entidad Bancaria (Banco - Sucursal)">
        <v-text-field placeholder="Inserte la entidad bancaria" v-model="client.bank" hide-details />
      </custom-input>
    </responsive-form-field>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '../../../components/CustomInput.vue';
import { type Client } from '@/models/client';
import { computed } from 'vue';
import ResponsiveFormField from '../../../components/ResponsiveFormField.vue';

const props = defineProps<{
  modelValue: Client;
}>();

const emit = defineEmits(['update:modelValue ']);

const client = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});
</script>

<style scoped></style>
