<template>
  <easy-data-table
    :headers="headers"
    :items="services"
    table-class-name="data-table"
    border-cell
    show-index
    hide-footer
  >
    <template #header-description>
      <span v-if="serviceGroup.serviceDescription">{{ serviceGroup.serviceDescription }}</span>
      <span v-else>{{ defaultDescriptionLabel }}</span>
    </template>
    <template #item-price="item">
      <div v-if="item.price" class="text-end">
        {{ parseFloat(item.price).toFixed(2) }}
      </div>
      <div v-else class="text-end">-</div>
    </template>
    <template #item-unit="item">{{ item.unit ?? '-' }}</template>
    <template #item-frequency="item">
      <span v-if="typeof item.frequency !== 'undefined'">{{ getFrequencyLabel(item.frequency) }}</span>
      <span v-else>-</span>
    </template>
    <template #item-actions="item">
      <div class="d-flex justify-center">
        <v-tooltip>
          <template #activator="attrs">
            <router-link :to="{ name: RouteNames.SERVICE_EDIT, params: { id: item.id } }">
              <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
            </router-link>
          </template>
          Editar servicio
        </v-tooltip>
      </div>
    </template>
  </easy-data-table>
</template>

<script setup lang="ts">
import { Header } from 'vue3-easy-data-table';
import { InvoiceFrequency, ServiceGroup } from '@/models/service';
import { computed } from 'vue';
import RouteNames from '@/router/route-names';

const props = defineProps<{
  serviceGroup: ServiceGroup;
}>();

const services = computed(() => props.serviceGroup.services);

const defaultDescriptionLabel = props.serviceGroup?.serviceDescription ?? 'Descripción';

const headers: Header[] = [
  { text: defaultDescriptionLabel, value: 'description' },
  { text: 'Unidad de medida', value: 'unit' },
  { text: 'Tarifa', value: 'price' },
  { text: 'Frecuencia', value: 'frequency' },
  { text: '', value: 'actions', width: 50 },
];

function getFrequencyLabel(frequency: InvoiceFrequency | null) {
  if (frequency !== null) {
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
        return '-';
    }
  }
}
</script>

<style scoped></style>
