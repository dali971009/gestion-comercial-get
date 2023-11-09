<template>
  <page-view title="Clientes" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.CLIENT_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir cliente
      </v-btn>
    </template>
    <easy-data-table :headers="headers" :items="clients" table-class-name="data-table" border-cell hide-footer>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.CLIENT_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar cliente
          </v-tooltip>
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import RouteNames from '../../router/route-names';
import PageView from '../../components/PageView.vue';
import { Header } from 'vue3-easy-data-table';
import { onMounted, ref } from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import type { Client } from '@/models/client';
import { makeClientApi } from '@/modules/api/proxy';

const breadcrumb = useBreadCrumb();
const clients = ref<Client[]>([]);

const headers: Header[] = [
  { text: 'Código', value: 'code' },
  { text: 'Nombre oficial de la entidad', value: 'officialName' },
  { text: 'OSDE / Grupo / Unión', value: 'osdeGroupUnion' },
  { text: 'Dirección', value: 'address' },
  { text: 'NIT', value: 'nit' },
  { text: 'Código REEUP U ONE', value: 'codeREEUP' },
  { text: '', value: 'actions' },
];

async function fetchClients() {
  const response = await makeClientApi().getClients();
  clients.value = response.data;
}

onMounted(() => {
  breadcrumb.set({
    title: 'Clientes',
  });
  fetchClients();
});
</script>

<style scoped></style>
