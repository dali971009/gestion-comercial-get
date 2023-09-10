<template>
  <div v-bind="$attrs">
    <div class="mb-1">
      <slot name="label">
        {{ label }}
        <span v-if="required" class="required">*</span>
      </slot>
      <v-tooltip v-if="infoIcon" bottom open-on-click open-on-hover>
        <template #activator="props">
          <v-btn icon text color="darkLight" v-bind="props" class="trk-tooltip-btn">
            <v-icon small>mdi-information</v-icon>
          </v-btn>
        </template>
        <slot name="hints" />
      </v-tooltip>
    </div>
    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: false, default: '' },
  required: { type: Boolean, required: false, default: false },
  infoIcon: { type: Boolean, required: false, default: false }
})
</script>

<style scoped>
.required {
  color: red;
}
</style>
