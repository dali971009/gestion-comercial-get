<template>
  <page-view :use-card="false">
    <v-sheet class="mb-2" border>
      <v-tabs v-model="selectedTab">
        <v-tab v-for="(group, i) in servicesStore.serviceGroups" :key="'tab_' + i" :value="group.name">{{ group.name }}</v-tab>
      </v-tabs>
      <v-divider />
      <v-window v-model="selectedTab">
        <v-window-item v-for="(group, i) in servicesStore.serviceGroups" :key="'window_' + i" :value="group.name" class="pa-2">
          <service-table-list :services="group.services" />
        </v-window-item>
      </v-window>
    </v-sheet>
  </page-view>
</template>

<script setup lang="ts">
  import PageView from "@/components/PageView.vue";
  import {Header} from 'vue3-easy-data-table';
  import {onMounted, ref} from "vue";
  import {useBreadCrumb} from "@/stores/breadcrumb";
  import {useServicesStore} from "@/stores/services";
  import {InvoiceFrequency} from "@/models/service";
  import ServiceTableList from "@/modules/services/ServiceTableList.vue";

  const breadcrumb = useBreadCrumb();
  const servicesStore = useServicesStore();

  const selectedTab = ref<string>();

  onMounted(() => {
    breadcrumb.set({
      title: 'Servicios'
    })
  })
</script>

<style scoped>
.data-table {
  --easy-table-header-font-color: white;
  --easy-table-header-background-color: #26a69a;
}
</style>