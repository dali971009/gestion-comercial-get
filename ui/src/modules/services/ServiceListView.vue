<template>
  <page-view :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.SERVICE_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir servicio
      </v-btn>
    </template>
    <v-sheet class="mb-2" border>
      <v-tabs v-model="selectedTab">
        <v-tab v-for="(group, i) in serviceGroups" :key="'tab_' + i" :value="group.name">
          {{ group.name }}
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-window v-model="selectedTab">
        <v-window-item v-for="(group, i) in serviceGroups" :key="'window_' + i" :value="group.name" class="pa-2">
          <service-table-list :service-group="group" />
        </v-window-item>
      </v-window>
    </v-sheet>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { onMounted, ref } from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import ServiceTableList from './ServiceTableList.vue';
import { makeServiceApi } from '@/modules/api/proxy';
import { ServiceGroup } from '@/models/service';
import RouteNames from '@/router/route-names';

const breadcrumb = useBreadCrumb();
const selectedTab = ref<string>();
const serviceGroups = ref<ServiceGroup[]>();

async function fetchServices() {
  const response = await makeServiceApi().getServices();
  serviceGroups.value = response.data;
  if (serviceGroups.value?.length > 0) {
    selectedTab.value = serviceGroups.value[0].name;
  }
}

onMounted(() => {
  breadcrumb.set({
    title: 'Servicios',
  });
  fetchServices();
});
</script>

<style scoped></style>
