<template>
  <v-app>
    <v-main>
      <the-header @nav-icon-pressed="toggleMenuExpanded" />
      <the-sidebar :expanded="menuIsExpanded" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TheSidebar from "@/components/TheSidebar.vue";
import TheHeader from "@/components/TheHeader.vue";
import {ref} from "vue";

const menuIsExpanded = ref<boolean>(true);

function toggleMenuExpanded() {
  menuIsExpanded.value = !menuIsExpanded.value;
}
</script>

<style scoped></style>
