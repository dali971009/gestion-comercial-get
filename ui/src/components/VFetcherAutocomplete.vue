<template>
  <v-autocomplete
    v-model="localModel"
    ref="autocomplete"
    :items="localItems"
    :loading="localLoading ?? false"
    :menu-props="{ maxHeight: '400' }"
    @update:search="searchUpdated"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import type { AutocompleteFetcher } from '@/composable/autocomplete-fetcher';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  fetcher: AutocompleteFetcher;
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue', 'update:search']);

const localLoading = computed(() => {
  return props.fetcher.loading.value ?? false;
});

const localItems = computed(() => {
  return props.fetcher.items.value ?? [];
});

const localModel = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

watch(
  () => props.modelValue,
  () => reload()
);

const isBeforeFirstFocus = ref<boolean>(true);
const handleFocus = () => {
  if (isBeforeFirstFocus.value) {
    reload();
    isBeforeFirstFocus.value = false;
  }
};

const dontHaveItemOnSimpleRequest = ref<boolean>(false);

async function reload() {
  if (localItems.value.length === 0) {
    if (!dontHaveItemOnSimpleRequest.value && props.fetcher.items.value.length === 0) {
      await props.fetcher.fetch();
      dontHaveItemOnSimpleRequest.value = props.fetcher?.items?.value?.length === 0;
    }
  } else {
    await props.fetcher.fetch();
  }
}

function searchUpdated(searchTerm: string) {
  if (props.fetcher) {
    props.fetcher.fetch(searchTerm);
  }
  emit('update:search', searchTerm);
}

const autocomplete = ref(null);

onMounted(async () => {
  console.log(props.modelValue);
  if (typeof props.modelValue !== 'undefined') {
    await reload();
  } else {
    await props.fetcher.fetch();
  }
});
</script>

<style scoped></style>
