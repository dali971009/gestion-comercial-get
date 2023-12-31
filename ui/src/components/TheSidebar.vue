<template>
  <v-navigation-drawer width="240" class="bg-grey-darken-4 border-none" :rail="!expanded">
    <v-list nav dense>
      <v-list-item
        v-for="(item, i) in items"
        :key="'menu_item_' + i"
        active-class="nav-active"
        :disabled="typeof item.routeName === 'undefined'"
        density="compact"
        variant="text"
        link
        :active="isActive(item.routeName)"
        :to="{ name: item.routeName }"
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { RouteNames } from '../router/route-names'

const route = useRoute()

defineProps({
  expanded: { type: Boolean, default: true }
})

interface MenuItem {
  icon: string
  title: string
  routeName?: RouteNames
}

const items = ref<MenuItem[]>([
  {
    icon: 'mdi-account-group',
    title: 'Clientes',
    routeName: RouteNames.CLIENT_LIST
  },
  {
    icon: 'mdi-tag',
    title: 'Servicios',
    routeName: RouteNames.SERVICE_LIST
  },
  {
    icon: 'mdi-file-document-edit-outline',
    title: 'Contratos',
    routeName: RouteNames.CONTRACT_LIST
  },
  {
    icon: 'mdi-receipt',
    title: 'Facturas',
    routeName: RouteNames.INVOICE_LIST
  }
])

function isActive(routeName?: RouteNames): boolean {
  return typeof routeName !== 'undefined' && route.name === routeName
}
</script>

<style scoped>
.header-list-item {
  padding: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 0 !important;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
}

.nav-active {
  color: #26a69a;
}

.nav-active::v-deep(.v-list-item__overlay) {
  opacity: 0;
}

.nav-active:before {
  content: '';
  position: absolute;
  background-color: #26a69a;
  width: 5px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  margin-inline-start: -8px;
}
</style>
