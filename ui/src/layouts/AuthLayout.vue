<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <global-snackbar />
  </v-app>
</template>

<script setup lang="ts">
import GlobalSnackbar from '@/components/GlobalSnackbar.vue';
</script>

<style scoped></style>
