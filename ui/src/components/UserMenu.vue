<template>
  <v-menu>
    <template #activator="attrs">
      <div v-bind="attrs.props" class="mx-4 hand">
        <v-avatar color="white" icon="mdi-account" class="text-primary" size="36" />
        <span class="ml-2">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
    </template>
    <v-list>
      <v-list-item @click="logout">Cerrar sesión</v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores';
import { useRouter } from 'vue-router';
import RouteNames from '@/router/route-names';

const authStore = useAuth();
const user = authStore.user;
const router = useRouter();

async function logout() {
  await authStore.logout();
  await router.push({ name: RouteNames.LOGIN });
}
</script>

<style scoped>
.hand {
  cursor: pointer;
}
</style>
