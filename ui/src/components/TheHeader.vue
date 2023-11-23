<template>
  <header>
    <v-app-bar elevation="0" density="compact" class="bg-primary">
      <v-app-bar-nav-icon color="white" @click="$emit('nav-icon-pressed')" />
      <v-app-bar-title class="ma-0">
        <b>Gestión comercial</b>
        <!--<router-link :to="{ name: RouteNames.DASHBOARD }" class="text-white text-decoration-none">

        </router-link>-->
      </v-app-bar-title>
      <v-spacer />
      <user-menu />
    </v-app-bar>
  </header>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue';
import RouteNames from '../router/route-names';

defineEmits(['nav-icon-pressed']);
</script>

<style scoped></style>
