<template>
  <page-view title="Ofertas comerciales" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.COMMERCIAL_OFFER_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir oferta comercial
      </v-btn>
    </template>
    <easy-data-table
      :headers="headers"
      :items="commercialOffers"
      table-class-name="data-table"
      show-index
      border-cell
      hide-footer
    >
      <template #item-serviceRequestId="item">
        <span v-if="item.serviceRequestId">
          <router-link
            :to="{ name: RouteNames.SERVICE_REQUEST_EDIT, params: { id: item.serviceRequestId } }"
            style="text-decoration: none"
            target="_blank"
          >
            Ver solicitud de servicio
            <v-icon icon="mdi-open-in-new" size="14" />
          </router-link>
        </span>
        <span v-else>-</span>
      </template>
      <template #item-services="item">
        {{ item.services.length === 0 ? 'Ninguno' : item.services.length }}
      </template>
      <template #item-total="item">
        <div class="d-flex justify-end">${{ calculateTotal(item.services) }}</div>
      </template>
      <template #item-wayToPay="item">
        <v-chip :color="getWayToPayColor(item.wayToPay)" density="comfortable" :label="true">
          <b>{{ getWayToPayName(item.wayToPay) }}</b>
        </v-chip>
      </template>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.COMMERCIAL_OFFER_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar oferta comercial
          </v-tooltip>
          <v-tooltip>
            <template #activator="attrs">
              <v-icon
                class="ml-2"
                icon="mdi-printer"
                color="primary"
                v-bind="attrs.props"
                @click="printCommercialOffer(item)"
              />
            </template>
            Imprimir oferta comercial
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
import type { CommercialOffer, CommercialOfferService } from '@/models/commercial-offer';
import { makeCommercialOfferApi } from '@/modules/api/proxy';
import { WayToPay } from '@/models/commercial-offer';

const breadcrumb = useBreadCrumb();
const commercialOffers = ref<CommercialOffer[]>([]);

const headers: Header[] = [
  { text: 'Entidad', value: 'client.officialName' },
  { text: 'Solicitud', value: 'serviceRequestId' },
  { text: 'Servicios', value: 'services' },
  { text: 'Tarifa', value: 'total' },
  { text: 'Forma de pago', value: 'wayToPay' },
  { text: '', value: 'actions', width: 50 },
];

function getWayToPayName(way: WayToPay) {
  switch (way) {
    case WayToPay.CASH:
      return 'Efectivo';
    case WayToPay.TRANSFER:
      return 'Transferencia';
    case WayToPay.MIXED:
      return 'Mixto';
    default:
      return '';
  }
}

function getWayToPayColor(way: WayToPay) {
  switch (way) {
    case WayToPay.CASH:
      return 'success';
    case WayToPay.TRANSFER:
      return 'info';
    case WayToPay.MIXED:
      return 'warning';
    default:
      return 'grey';
  }
}

function calculateTotal(services: CommercialOfferService[]) {
  let total = 0;
  for (const service of services) {
    total += (service.price ?? 0) * (service.quantity ?? 1);
  }
  return total;
}

async function fetchCommercialOffers() {
  const response = await makeCommercialOfferApi().getCommercialOffers();
  commercialOffers.value = response.data;
}

function printCommercialOffer(item: CommercialOffer) {
  console.log(item.id);
}

onMounted(() => {
  breadcrumb.set({
    title: 'Ofertas comerciales',
  });
  fetchCommercialOffers();
});
</script>

<style scoped></style>
