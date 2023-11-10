<template>
  <page-view title="Añadir servicio" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <service-form v-model="service" :edit="edit" :error-handler="errorHandler" />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '@/router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { Service } from '@/models/service';
import ServiceForm from './ServiceForm.vue';
import { makeServiceApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.SERVICE_EDIT;
const serviceId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const service = ref<Service>({
  id: '',
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchService() {
  try {
    const response = await makeServiceApi().getService({ id: serviceId });
    service.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      await makeServiceApi().updateService({ service: service.value });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos del servicio' });
    } else {
      await makeServiceApi().createService({ service: service.value });
      snackbar.push({ color: 'error', text: 'Se ha creado un nuevo servicio' });
    }
    router.push({ name: RouteNames.SERVICE_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} el servicio`,
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
    fetchService();
  }
  breadcrumb.set({
    back: { name: RouteNames.SERVICE_LIST },
    backLabel: 'Servicio',
    title: edit ? 'Editar servicio' : 'Añadir servicio',
  });
});
</script>

<style scoped></style>
