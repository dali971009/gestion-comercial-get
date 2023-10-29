<template>
  <page-view :use-card="false">
    <v-alert color="warning" icon="mdi-information">Por hacer</v-alert>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '../../components/PageView.vue';
import { onMounted } from 'vue';
import { useBreadCrumb } from '../../stores/breadcrumb';

const breadcrumb = useBreadCrumb();

onMounted(() => {
  breadcrumb.set({
    title: 'Facturas',
  });
});
</script>

<style scoped></style>
