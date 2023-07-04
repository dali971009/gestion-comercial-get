<template>
  <div class="d-flex align-center py-4 px-2">
    <the-breadcrumb />
    <v-spacer/>
    <slot name="actions" />
  </div>
  <v-card v-if="useCard" class="mx-2">
    <slot />
  </v-card>
  <div v-else class="mx-2">
    <slot />
  </div>
</template>

<script setup lang="ts">
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";

defineProps({
  useCard: { type: Boolean, default: true }
});
</script>

<style scoped>
h1 {
  font-size: 18pt;
  font-weight: 500;
}
</style>