<template>
  <page-view title="Usuarios" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.USER_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir usuario
      </v-btn>
    </template>
    <easy-data-table :headers="headers" :items="users" table-class-name="data-table" border-cell hide-footer>
      <template #item-status="item">
        <v-chip :color="getStatusColor(item.status)" density="comfortable" :label="true">
          <b>{{ getStatusName(item.status) }}</b>
        </v-chip>
      </template>

      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.USER_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar usuario
          </v-tooltip>
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import RouteNames from '../../router/route-names';
import PageView from '../../components/PageView.vue';
import { Header } from 'vue3-easy-data-table';
import { onMounted, ref } from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import type { User } from '@/models/user';
import {makeUserApi } from '@/modules/api/proxy';
import {UserStatus} from "@/models/user";

const breadcrumb = useBreadCrumb();
const users = ref<User[]>([]);

const headers: Header[] = [
  { text: 'Nombre', value: 'firstName' },
  { text: 'Apellidos', value: 'lastName' },
  { text: 'Correo', value: 'email' },
  { text: 'Teléfono', value: 'phoneNumber' },
  { text: 'Estado', value: 'status' },
  { text: '', value: 'actions' },
];

function getStatusName(status: UserStatus) {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Activo';
    case UserStatus.INACTIVE:
      return 'Inactivo';
    case UserStatus.REMOVED:
      return 'Eliminado';
    default:
      return '';
  }
}

function getStatusColor(status: UserStatus) {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'success';
    case UserStatus.REMOVED:
      return 'error';
    case UserStatus.INACTIVE:
    default:
      return 'grey';
  }
}

async function fetchUsers() {
  const response = await makeUserApi().getUsers();
  users.value = response.data;
}

onMounted(() => {
  breadcrumb.set({
    title: 'Usuarios',
  });
  fetchUsers();
});
</script>

<style scoped></style>
