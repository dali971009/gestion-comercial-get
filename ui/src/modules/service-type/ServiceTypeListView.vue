<template>
  <page-view title="Tipos de servicio" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.SERVICE_TYPE_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir tipo de servicio
      </v-btn>
    </template>
    <easy-data-table :headers="headers" :items="serviceTypes" table-class-name="data-table" border-cell hide-footer>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.SERVICE_TYPE_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar tipo de servicio
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
import type { ServiceType } from '@/models/service-type';
import { makeServiceTypeApi } from '@/modules/api/proxy';

const breadcrumb = useBreadCrumb();
const serviceTypes = ref<ServiceType[]>([]);

const headers: Header[] = [
  { text: 'Nombre', value: 'name' },
  { text: '', value: 'actions', width: 50 },
];

async function fetchServiceTypes() {
  const response = await makeServiceTypeApi().getServiceTypes();
  serviceTypes.value = response.data;
}

onMounted(() => {
  breadcrumb.set({
    title: 'Tipos de servicio',
  });
  fetchServiceTypes();
});
</script>

<style scoped></style>
