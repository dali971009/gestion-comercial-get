<template>
  <page-view title="Añadir solicitud de servicio" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <service-request-form v-model="serviceRequest" :edit="edit" :error-handler="errorHandler" />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { ServiceRequest } from '@/models/service-request';
import ServiceRequestForm from './ServiceRequestForm.vue';
import { makeServiceRequestApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';
import moment from 'moment';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.SERVICE_REQUEST_EDIT;
const serviceRequestId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const serviceRequest = ref<ServiceRequest>({
  id: '',
  applicationDate: moment().subtract(5, 'hour').toISOString(),
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchServiceRequest() {
  try {
    const response = await makeServiceRequestApi().getServiceRequest({ id: serviceRequestId });
    serviceRequest.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      await makeServiceRequestApi().updateServiceRequest({ serviceRequest: serviceRequest.value });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos dla solicitud de servicio' });
    } else {
      await makeServiceRequestApi().createServiceRequest({ serviceRequest: serviceRequest.value });
      snackbar.push({ color: 'error', text: 'Se ha creado una nueva solicitud de servicio' });
    }
    router.push({ name: RouteNames.SERVICE_REQUEST_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} la solicitud de servicio`,
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
    fetchServiceRequest();
  }
  breadcrumb.set({
    back: { name: RouteNames.SERVICE_REQUEST_LIST },
    backLabel: 'Solicitudes de servicio',
    title: edit ? 'Editar solicitud de servicio' : 'Añadir solicitud de servicio',
  });
});
</script>

<style scoped></style>
