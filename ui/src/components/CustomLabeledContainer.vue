<template>
  <fieldset class="pa-2 rounded">
    <legend v-if="label">
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: false, default: '' }
})
</script>

<style scoped>
fieldset {
  border: 1px solid #cecece;
}

legend {
  font-weight: bold;
  font-size: 11pt;
  letter-spacing: 0.2pt;
}
</style>
