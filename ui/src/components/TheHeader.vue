<template>
  <header>
    <v-app-bar elevation="0" density="compact" class="bg-teal">
      <v-app-bar-nav-icon color="grey-darken-4" @click="$emit('nav-icon-pressed')" />
      <v-app-bar-title class="ma-0">
        <router-link
          :to="{ name: RouteNames.DASHBOARD }"
          class="text-grey-darken-4 text-decoration-none"
          >Gestión comercial</router-link
        >
      </v-app-bar-title>
      <v-spacer />
      <user-menu />
    </v-app-bar>
  </header>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue'
import { RouteNames } from '../router/route-names'

defineEmits(['nav-icon-pressed'])
</script>

<style scoped></style>
