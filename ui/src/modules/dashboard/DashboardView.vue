<template>
  <page-view :use-card="false">
    Token: {{ Cookies.get(CookieNames.ACCESS_TOKEN) }}
    <br />
    User: {{ useAuth().user }}
    <v-alert color="warning" icon="mdi-information">Por hacer</v-alert>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { onMounted } from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import Cookies from 'js-cookie';
import CookieNames from '@/helpers/cookies/cookie-names';
import { useAuth } from '@/stores';

const breadcrumb = useBreadCrumb();

onMounted(() => {
  breadcrumb.set({
    title: 'Menú principal',
  });
});
</script>

<style scoped></style>
