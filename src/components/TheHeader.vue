<template>
  <header>
    <v-app-bar elevation="0" density="compact" class="bg-teal">
      <v-app-bar-nav-icon color="grey-darken-4" @click="$emit('nav-icon-pressed')"/>
      <v-spacer />
      <user-menu />
    </v-app-bar>
  </header>
</template>

<script setup lang="ts">
import UserMenu from "@/components/UserMenu.vue";

defineEmits(['nav-icon-pressed'])
</script>

<style scoped>

</style>