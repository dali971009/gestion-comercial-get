<template>
  <page-view title="Añadir tipo de servicio" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <service-type-form v-model="serviceType" :edit="edit" :error-handler="errorHandler" />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { ServiceType } from '@/models/serviceType';
import ServiceTypeForm from './ServiceTypeForm.vue';
import { makeServiceTypeApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.SERVICE_TYPE_EDIT;
const serviceTypeId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const serviceType = ref<ServiceType>({
  id: '',
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchServiceType() {
  try {
    const response = await makeServiceTypeApi().getServiceType({ serviceTypeId });
    serviceType.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      await makeServiceTypeApi().updateServiceType({ serviceType: serviceType.value });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos del tipo de servicio' });
    } else {
      await makeServiceTypeApi().createServiceType({ serviceType: serviceType.value });
      snackbar.push({ color: 'error', text: 'Se ha creado un nuevo tipo de servicio' });
    }
    router.push({ name: RouteNames.SERVICE_TYPE_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} el tipo de servicio`,
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
    fetchServiceType();
  }
  breadcrumb.set({
    back: { name: RouteNames.SERVICE_TYPE_LIST },
    backLabel: 'Tipos de servicio',
    title: edit ? 'Editar tipo de servicio' : 'Añadir tipo de servicio',
  });
});
</script>

<style scoped></style>
