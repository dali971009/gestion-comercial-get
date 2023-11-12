<template>
  <page-view title="Añadir oferta comercial" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <commercial-offer-form
      v-model="commercialOffer"
      :service-request="serviceRequest"
      :services="services"
      :edit="edit"
      :error-handler="errorHandler"
    />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { CommercialOffer } from '@/models/commercial-offer';
import CommercialOfferForm from './CommercialOfferForm.vue';
import { makeCommercialOfferApi, makeServiceApi, makeServiceRequestApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';
import moment from 'moment';
import { Service } from '@/models/service';
import type { ServiceRequest } from '@/models/service-request';
import { getStringValueFromQuery } from '@/helpers/query';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.COMMERCIAL_OFFER_EDIT;
const commercialOfferId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const commercialOffer = ref<CommercialOffer>({
  id: '',
  services: [],
});
const services = ref<Service[]>([]);
const serviceRequest = ref<ServiceRequest>();

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchCommercialOffer() {
  try {
    const response = await makeCommercialOfferApi().getCommercialOffer({ id: commercialOfferId });
    if (typeof response.data.services === 'undefined') {
      response.data.services = [];
    }
    commercialOffer.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchServices() {
  try {
    const response = await makeServiceApi().getServiceLabels();
    services.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchServiceRequest(serviceRequestId: string) {
  try {
    const response = await makeServiceRequestApi().getServiceRequest({ id: serviceRequestId });
    serviceRequest.value = response.data;
    commercialOffer.value.serviceRequestId = serviceRequest.value.id;
    commercialOffer.value.clientId = serviceRequest.value.requestingEntityId;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      await makeCommercialOfferApi().updateCommercialOffer({ commercialOffer: commercialOffer.value });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos de la oferta comercial' });
    } else {
      await makeCommercialOfferApi().createCommercialOffer({ commercialOffer: commercialOffer.value });
      snackbar.push({ color: 'error', text: 'Se ha creado una nueva oferta comercial' });
    }
    router.push({ name: RouteNames.COMMERCIAL_OFFER_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} la oferta comercial`,
        });
        snackbarStore.push({ color: 'error', text: messages.AUTH.WRONG_CREDENTIALS });
      } else {
        snackbarStore.push({ color: 'error', text: error });
      }
      console.error(error);
    }
  }
}

onMounted(() => {
  if (edit) {
    fetchCommercialOffer();
  } else {
    const serviceRequestId = getStringValueFromQuery('sr');
    if (serviceRequestId !== undefined) {
      fetchServiceRequest(serviceRequestId);
    }
  }
  fetchServices();
  breadcrumb.set({
    back: { name: RouteNames.COMMERCIAL_OFFER_LIST },
    backLabel: 'Ofertas comerciales',
    title: edit ? 'Editar oferta comercial' : 'Añadir oferta comercial',
  });
});
</script>

<style scoped></style>
