<template>
  <easy-data-table
    :headers="headers"
    :items="services"
    table-class-name="data-table"
    rows-per-page="50"
    border-cell
    hide-footer
  >
    <template #header-description>
      <span v-if="serviceGroup.descriptionLabel">{{ serviceGroup.descriptionLabel }}</span>
      <span v-else>{{ defaultDescriptionLabel }}</span>
    </template>
    <template #item-price="item">
      <div v-if="item.price" class="text-end">
        {{ item.price.toFixed(2) }}
      </div>
      <div v-else class="text-end">-</div>
    </template>
    <template #item-um="item">
      <span v-if="item.um">{{ item.um }}</span>
      <span v-else>-</span>
    </template>
    <template #item-invoiceFrequency="item">
      <span v-if="typeof item.invoiceFrequency !== 'undefined'">{{
        getFrequencyLabel(item.invoiceFrequency)
      }}</span>
      <span v-else>-</span>
    </template>
  </easy-data-table>
</template>

<script setup lang="ts">
import { Header } from 'vue3-easy-data-table'
import { InvoiceFrequency, ServiceGroup } from '../../models/service'
import { computed } from 'vue'

const props = defineProps<{
  serviceGroup: ServiceGroup
}>()

const services = computed(() => props.serviceGroup?.services ?? [])

const defaultDescriptionLabel = 'Descripción'

const headers: Header[] = [
  { text: 'Id', value: 'id' },
  { text: defaultDescriptionLabel, value: 'description' },
  { text: 'Unidad de medida', value: 'um' },
  { text: 'Tarifa', value: 'price' },
  { text: 'Frecuencia', value: 'invoiceFrequency' }
]

function getFrequencyLabel(frequency: InvoiceFrequency) {
  switch (frequency) {
    case InvoiceFrequency.OCCASIONALLY:
      return 'Puntual'
    case InvoiceFrequency.MONTHLY:
      return 'Mensual'
    case InvoiceFrequency.EVERY_THREE_MONTHS:
      return 'Trimestral'
    case InvoiceFrequency.EVERY_SIX_MONTHS:
      return 'Semestral'
    case InvoiceFrequency.YEARLY:
      return 'Anual'
    default:
      return ''
  }
}
</script>

<style scoped></style>
