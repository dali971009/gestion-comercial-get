<template>
  <page-view title="Solicitudes de servicio" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.SERVICE_REQUEST_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir solicitud de servicio
      </v-btn>
    </template>
    {{ moment(`${2023}-01-02`).startOf('year').toISOString() }}
    {{ moment(`${2023}-01-02`).endOf('year').toDate() }}
    <easy-data-table :headers="headers" :items="serviceRequests" table-class-name="data-table" border-cell hide-footer>
      <template #item-applicationDate="item">
        {{ formatDate(item.applicationDate) }}
      </template>
      <template #item-requestingEntityId="item">
        {{ getClientLabel(item.requestingEntityId) }}
      </template>
      <template #item-status="item">
        <v-chip
          v-if="getStatusName(item.status).length <= 25"
          :color="getStatusColor(item.status)"
          density="comfortable"
          :label="true"
        >
          <b>{{ getStatusName(item.status) }}</b>
        </v-chip>
        <v-tooltip v-else>
          <template #activator="attrs">
            <v-chip v-bind="attrs.props" :color="getStatusColor(item.status)" density="comfortable" :label="true">
              <b>{{ getStatusName(item.status).slice(0, 25) }}...</b>
            </v-chip>
          </template>
          {{ getStatusName(item.status) }}
        </v-tooltip>
      </template>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.SERVICE_REQUEST_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar solicitud de servicio
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
import type { ServiceRequest } from '@/models/service-request';
import { makeClientApi, makeServiceRequestApi } from '@/modules/api/proxy';
import { UserStatus } from '@/models/user';
import { ServiceRequestStatus } from '@/models/service-request';
import type { LabelResult } from '@/models/label-result';
import moment from 'moment';

const breadcrumb = useBreadCrumb();
const serviceRequests = ref<ServiceRequest[]>([]);
const clientLabels = ref<LabelResult[]>([]);

const headers: Header[] = [
  { text: '#', value: 'number' },
  { text: 'Fecha de solicitud', value: 'applicationDate' },
  { text: 'Entidad solicitante', value: 'requestingEntityId' },
  { text: 'Alcance', value: 'scope' },
  { text: 'Estado', value: 'status' },
  { text: '', value: 'actions', width: 50 },
];

function getStatusName(status: ServiceRequestStatus) {
  switch (status) {
    case ServiceRequestStatus.UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA:
      return 'En evaluación por el área correspondiente';
    case ServiceRequestStatus.NOT_ACCEPTED_BY_GET:
      return 'No aceptada por GET';
    case ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING:
      return 'Pendiente presentación oferta o contrato';
    case ServiceRequestStatus.IN_NEGOTIATION_PROCESS:
      return 'En proceso de negociación';
    case ServiceRequestStatus.NOT_ACCEPTED_BY_CLIENT:
      return 'No aceptada por el cliente';
    case ServiceRequestStatus.SIGNED_CONTRACT:
      return 'Contrato firmado';
    default:
      return '';
  }
}

function getStatusColor(status: ServiceRequestStatus) {
  switch (status) {
    case ServiceRequestStatus.UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA:
    case ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING:
      return 'warning';
    case ServiceRequestStatus.IN_NEGOTIATION_PROCESS:
      return 'info';
    case ServiceRequestStatus.NOT_ACCEPTED_BY_CLIENT:
    case ServiceRequestStatus.NOT_ACCEPTED_BY_GET:
      return 'error';
    case ServiceRequestStatus.SIGNED_CONTRACT:
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
  return moment(date).add(5, 'hour').format(moment.HTML5_FMT.DATE);
}

async function fetchServiceRequests() {
  const response = await makeServiceRequestApi().getServiceRequests();
  serviceRequests.value = response.data;
}

onMounted(() => {
  breadcrumb.set({
    title: 'Solicitudes de servicio',
  });
  fetchClientLabels();
  fetchServiceRequests();
});
</script>

<style scoped></style>
