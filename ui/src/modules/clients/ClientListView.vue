<template>
  <page-view title="Clientes" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.CLIENT_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir cliente
      </v-btn>
    </template>
    <easy-data-table
      :headers="headers"
      :items="clientsStore.clients"
      table-class-name="data-table"
      border-cell
      hide-footer
    >
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-btn
            variant="flat"
            height="28"
            class="text-none"
            prepend-icon="mdi-pencil"
            color="blue"
            :to="{ name: RouteNames.CLIENT_EDIT, params: { client_code: item.code } }"
          >
            Editar
          </v-btn>
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import RouteNames from '../../router/route-names';
import PageView from '../../components/PageView.vue';
import { useClientsStore } from '../../stores/clients';
import { Header } from 'vue3-easy-data-table';
import { onMounted } from 'vue';
import { useBreadCrumb } from '../../stores/breadcrumb';

const breadcrumb = useBreadCrumb();
const clientsStore = useClientsStore();

const headers: Header[] = [
  { text: 'Código', value: 'code' },
  { text: 'Nombre oficial de la entidad', value: 'officialName' },
  { text: 'OSDE / Grupo / Unión', value: 'osdeGroupUnion' },
  { text: 'Dirección', value: 'address' },
  { text: 'NIT', value: 'nit' },
  { text: 'Código REEUP U ONE', value: 'codeREEUP' },
  { text: 'Opciones', value: 'actions' },
];

onMounted(() => {
  breadcrumb.set({
    title: 'Clientes',
  });
});
</script>

<style scoped>
.v-btn {
  color: white;
}
.data-table {
  --easy-table-header-font-color: white;
  --easy-table-header-background-color: #26a69a;
}
</style>
