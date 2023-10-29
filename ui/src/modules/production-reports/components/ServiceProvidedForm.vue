<template>
  <v-row>
    <responsive-form-field>
      <custom-input label="Cliente" :required="true">
        <client-picker
            placeholder="Seleccione el cliente"
            v-model="serviceProvided.client" />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Servicio" :required="true">
        <service-picker
            placeholder="Seleccione el servicio"
            v-model="serviceProvided.service" />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Contrato" :required="true">
        <v-text-field
            placeholder="Inserte el contrato"
            v-model="serviceProvided.contractNumber"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input :label="getQuantityLabel(serviceProvided)" :required="true">
        <v-text-field
            placeholder="Inserte la cantidad"
            v-model="serviceProvided.quantity"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Importe">
        <v-text-field
            placeholder="0"
            :disabled="true"
            v-model="amount"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Centro de costo">
        <v-text-field
            placeholder="Inserte el centro de costo"
            v-model="serviceProvided.costCenter"
            type="number"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Modalidad">
        <v-text-field
            placeholder="Inserte la modalidad"
            v-model="serviceProvided.modality"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Periodo">
        <v-text-field
            placeholder="Inserte el periodo"
            v-model="serviceProvided.period"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Número de factura">
        <v-text-field
            placeholder="Inserte el número de factura"
            v-model="serviceProvided.invoiceNumber"
            hide-details
        />
      </custom-input>
    </responsive-form-field>
  </v-row>
  <v-btn
      class="mt-4"
      color="error"
      prepend-icon="mdi-delete"
      @click="handleDelete"
  >Eliminar
  </v-btn>
</template>

<script setup lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import ClientPicker from "@/modules/production-reports/components/ClientPicker.vue";
import ResponsiveFormField from "@/components/ResponsiveFormField.vue";
import ServicePicker from "@/modules/production-reports/components/ServicePicker.vue";
import {computed, PropType} from "vue";
import {ServiceProvided} from "@/models/production-report";

const emit = defineEmits(['update:modelValue', 'delete'])
const props = defineProps({
  modelValue: { type: Object as PropType<ServiceProvided>, required: true }
});

const serviceProvided = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function getQuantityLabel() {
  if (serviceProvided.value.service !== undefined && serviceProvided.value.service.um !== undefined) {
    return `Cantidad (${serviceProvided.value.service.um})`;
  } else {
    return 'Cantidad';
  }
}

const amount = computed(() => {
  if (serviceProvided.value.service !== undefined && serviceProvided.value.service.price !== undefined && serviceProvided.value.quantity !== undefined) {
    return serviceProvided.value.service.price * serviceProvided.value.quantity;
  } else {
    return 0;
  }
});

function handleDelete() {
  emit('delete')
}
</script>

<style scoped>

</style>