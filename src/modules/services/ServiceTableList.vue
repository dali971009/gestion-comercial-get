<template>
  <easy-data-table
      :headers="headers"
      :items="services"
      table-class-name="data-table"
      border-cell
      hide-footer >
    <template #item-price="item">
      <div class="text-end">
        {{ item.price.toFixed(2) }}
      </div>
    </template>
    <template #item-invoiceFrequency="item">
      <span v-if="item.invoiceFrequency">{{ getFrequencyLabel(item.invoiceFrequency) }}</span>
      <span v-else>-</span>
    </template>
  </easy-data-table>
</template>

<script setup lang="ts">

import {Header} from "vue3-easy-data-table";
import {InvoiceFrequency, Service} from "@/models/service";

defineProps<{
  services: Service[],
}>()

const headers: Header[] = [
  { text: 'Id', value: 'id' },
  { text: 'Descripción', value: 'description' },
  { text: 'Unidad de medida', value: 'um' },
  { text: 'Tarifa', value: 'price' },
  { text: 'Frecuencia', value: 'invoiceFrequency' },
];

function getFrequencyLabel(frequency: InvoiceFrequency) {
  switch (frequency) {
    case InvoiceFrequency.OCCASIONALLY:
      return 'Puntual';
    case InvoiceFrequency.MONTHLY:
      return 'Mensual';
    case InvoiceFrequency.EVERY_THREE_MONTHS:
      return 'Trimestral';
    case InvoiceFrequency.EVERY_SIX_MONTHS:
      return 'Semestral';
    case InvoiceFrequency.YEARLY:
      return 'Anual';
    default:
      return '';
  }
}
</script>

<style scoped>

</style>