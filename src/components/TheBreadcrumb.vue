<template>
  <span v-if="breadcrumb.props.back">
    <span v-if="breadcrumb.props.backLabel && breadcrumb.props.backLabel.trim().length !== 0" class="d-flex align-center">
      <v-btn prepend-icon="mdi-arrow-left" variant="text" class="text-none" @click="handleBack">{{ breadcrumb.props.backLabel }}</v-btn>
      <span class="slash mr-3">/</span>
    </span>
    <v-btn v-else variant="text" @click="handleBack" :to="{name: RouteNames.CLIENT_LIST}" icon><v-icon icon="mdi-arrow-left"/></v-btn>
  </span>
  <span v-else class="ml-3" />
  <span class="title">{{ breadcrumb.props.title }}</span>
</template>

<script setup lang="ts">
  import {useBreadCrumb} from "@/stores/breadcrumb";
  import {useRouter} from "vue-router";
  import {RouteNames} from "@/router/route-names";

  const breadcrumb = useBreadCrumb();
  const router = useRouter();

  function handleBack() {
    router.push(breadcrumb.props.back!);
    breadcrumb.reset();
  }
</script>

<style scoped>
.slash {
  font-weight: bold;
  font-size: 14pt;
  color: #26a69a;
}
.title {
  font-weight: bold;
  font-size: 14pt;
}
</style>