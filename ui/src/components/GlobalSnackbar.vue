<template>
  <v-snackbar
    v-if="snackMessages.length"
    v-model="snackModel"
    offset="300px"
    position="fixed"
    :absolute="true"
    :timeout="-1"
    color="transparent"
    location="bottom right"
    :z-index="99999"
    variant="flat"
  >
    <template v-for="(snack, index) in snackMessages" :key="'snack' + index">
      <v-alert
        v-model="snack.show"
        :color="snack.color"
        :title="snack.title"
        :variant="snack.variant"
        :icon="snack.icon"
        :closable="snack.closable"
        :close-icon="snack.closeIcon"
        class="my-2"
      >
        {{ snack.text }}
      </v-alert>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackBar } from '@/stores';
import { computed, ref } from 'vue';

const snackBarStore = useSnackBar();
const snackModel = ref(true);

const snackMessages = computed(() => {
  if (snackBarStore.messages) {
    return snackBarStore.messages.slice(0, 5);
  }
  return [];
});
</script>

<style scoped></style>
