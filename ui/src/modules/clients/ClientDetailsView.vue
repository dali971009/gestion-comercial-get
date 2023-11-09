<template>
  <page-view title="Añadir cliente" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <v-sheet class="mb-2" border>
      <v-tabs v-model="selectedTab">
        <v-tab :value="ClientTab.GENERAL">General</v-tab>
        <v-tab :value="ClientTab.CONTACTS">Contactos</v-tab>
        <v-tab :value="ClientTab.BANK">Datos bancarios</v-tab>
      </v-tabs>
      <v-divider />
      <v-window v-model="selectedTab">
        <v-window-item :value="ClientTab.GENERAL">
          <client-general-form v-model="client" :error-handler="errorHandler" />
        </v-window-item>
        <v-window-item :value="ClientTab.CONTACTS">
          <client-contacts-form v-model="client" />
        </v-window-item>
        <v-window-item :value="ClientTab.BANK">
          <client-bank-form v-model="client" />
        </v-window-item>
      </v-window>
    </v-sheet>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '../../components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '../../router/route-names';
import { useRoute } from 'vue-router';
import type { Client } from '@/models/client';
import router from '../../router';
import { ClientTab } from './tabs';
import ClientGeneralForm from './forms/ClientGeneralForm.vue';
import ClientContactsForm from './forms/ClientContactsForm.vue';
import ClientBankForm from './forms/ClientBankForm.vue';
import { makeClientApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();

const selectedTab = ref<ClientTab>(ClientTab.GENERAL);

const edit = route.name === RouteNames.CLIENT_EDIT;
const clientId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const client = ref<Client>({
  id: '',
  staff: {
    authorizedPeople: [],
  },
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchClient() {
  try {
    const response = await makeClientApi().getClient({ clientId });
    client.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      await makeClientApi().updateClient({ client: client.value, clientId: clientId });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos del cliente' });
    } else {
      await makeClientApi().createClient({ client: client.value });
      snackbar.push({ color: 'error', text: 'Se ha creado un nuevo cliente' });
    }
    router.push({ name: RouteNames.CLIENT_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} el cliente`,
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
    fetchClient();
  }
  breadcrumb.set({
    back: { name: RouteNames.CLIENT_LIST },
    backLabel: 'Clientes',
    title: edit ? 'Editar cliente' : 'Añadir cliente',
  });
});
</script>

<style scoped></style>
