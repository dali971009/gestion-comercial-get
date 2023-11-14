<template>
  <page-view title="Contratos" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.CONTRACT_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir contrato
      </v-btn>
    </template>
    <easy-data-table :headers="headers" :items="contracts" table-class-name="data-table" border-cell hide-footer>
      <template #item-clientId="item">
        {{ getClientLabel(item.clientId) }}
      </template>
      <template #item-type="item">
        <v-chip
          v-if="getTypeName(item.type).length <= 26"
          :color="getTypeColor(item.type)"
          density="comfortable"
          :label="true"
        >
          <b>{{ getTypeName(item.type) }}</b>
        </v-chip>
        <v-tooltip v-else>
          <template #activator="attrs">
            <v-chip v-bind="attrs.props" :color="getTypeColor(item.type)" density="comfortable" :label="true">
              <b>{{ getTypeName(item.type).slice(0, 26) }}...</b>
            </v-chip>
          </template>
          {{ getTypeName(item.type) }}
        </v-tooltip>
      </template>
      <template #item-signatureDate="item">
        {{ formatDate(item.signatureDate) }}
      </template>
      <template #item-validity="item">
        {{ formatDate(item.validity) }}
      </template>
      <template #item-isPreform="item">
        <v-chip v-if="item.isPreform" color="warning" density="comfortable" :label="true">Proforma</v-chip>
        <v-chip v-else color="success" density="comfortable" :label="true">Firmado</v-chip>
      </template>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.CONTRACT_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            {{ item.isPreform ? 'Editar contrato' : 'Crear suplemento' }}
          </v-tooltip>
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names';
import PageView from '@/components/PageView.vue';
import { Header } from 'vue3-easy-data-table';
import { onMounted, ref } from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import type { Contract } from '@/models/contract';
import { makeClientApi, makeContractApi } from '@/modules/api/proxy';
import type { LabelResult } from '@/models/label-result';
import moment from 'moment';
import { ContractType } from '@/models/contract';

const breadcrumb = useBreadCrumb();
const contracts = ref<Contract[]>([]);
const clientLabels = ref<LabelResult[]>([]);

const headers: Header[] = [
  { text: '#', value: 'number' },
  { text: 'Entidad', value: 'clientId' },
  { text: 'Valor', value: 'value' },
  { text: 'Tipo', value: 'type' },
  { text: 'Fecha de firma', value: 'signatureDate' },
  { text: 'Vigencia', value: 'validity' },
  { text: 'Estado', value: 'isPreform' },
  { text: '', value: 'actions', width: 50 },
];

function getTypeName(type: ContractType) {
  switch (type) {
    case ContractType.CONTRACT_OF_SERVICE:
      return 'Contrato de prestación de servicios';
    case ContractType.LOAN_AGREEMENT:
      return 'Contrato de Comodato';
    case ContractType.PROJECT_DOCUMENTATION:
      return 'Documentación de Proyectos';
    case ContractType.EXECUTION_OF_WORK:
      return 'Ejecución de obras';
    case ContractType.LEASING_CONTRACT:
      return 'Contrato de Arrendamiento';
    default:
      return '';
  }
}

function getTypeColor(status: ContractType) {
  switch (status) {
    case ContractType.CONTRACT_OF_SERVICE:
    case ContractType.LOAN_AGREEMENT:
    case ContractType.PROJECT_DOCUMENTATION:
    case ContractType.EXECUTION_OF_WORK:
    case ContractType.LEASING_CONTRACT:
      return 'success';
    default:
      return 'grey';
  }
}

async function fetchClientLabels() {
  const response = await makeClientApi().getClientLabels();
  clientLabels.value = response.data;
}

function getClientLabel(clientId: string) {
  const label = clientLabels.value.find(it => it.value === clientId);
  return label === undefined ? '' : label.title;
}

function formatDate(date: Date) {
  if (typeof date === 'undefined' || date === null) {
    return '-';
  }
  return moment(date).add(5, 'hour').format(moment.HTML5_FMT.DATE);
}

async function fetchContracts() {
  const response = await makeContractApi().getContracts();
  contracts.value = response.data;
}

onMounted(() => {
  breadcrumb.set({
    title: 'Contratos',
  });
  fetchClientLabels();
  fetchContracts();
});
</script>

<style scoped></style>
