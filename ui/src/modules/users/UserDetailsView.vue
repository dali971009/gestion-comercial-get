<template>
  <page-view title="Añadir usuario" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <user-form v-model="user" :edit="edit" :error-handler="errorHandler" />
  </page-view>
</template>

<script setup lang="ts">
import PageView from '../../components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { onMounted, ref } from 'vue';
import RouteNames from '../../router/route-names';
import { useRoute, useRouter } from 'vue-router';
import type { User } from '@/models/user';
import { UserStatus } from '@/models/user';
import UserForm from './UserForm.vue';
import { makeUserApi } from '@/modules/api/proxy';
import { isArray } from 'lodash';
import { useSnackBar } from '@/stores';
import { AxiosError } from 'axios';
import { messages } from '@/helpers/messages';
import { useErrorHandler } from '@/helpers/errors/error-handler';

const breadcrumb = useBreadCrumb();
const snackbar = useSnackBar();
const route = useRoute();
const router = useRouter();

const edit = route.name === RouteNames.USER_EDIT;
const userId = isArray(route.params.id) ? route.params.id[0] : route.params.id;

const user = ref<User>({
  id: '',
  status: UserStatus.ACTIVE,
});

const errorHandler = useErrorHandler();
const snackbarStore = useSnackBar();

async function fetchUser() {
  try {
    const response = await makeUserApi().getUser({ id: userId });
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function handleSave() {
  try {
    if (edit) {
      console.log(user.value);
      await makeUserApi().updateUser({ user: user.value });
      snackbar.push({ color: 'error', text: 'Se han actualizado los datos del usuario' });
    } else {
      await makeUserApi().createUser({ user: user.value });
      snackbar.push({ color: 'error', text: 'Se ha creado un nuevo usuario' });
    }
    router.push({ name: RouteNames.USER_LIST });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({
          color: 'error',
          text: `Ocurrió un error ${edit ? 'actualizando' : 'creando'} el usuario`,
        });
        snackbarStore.push({ color: 'error', text: messages.AUTH.WRONG_CREDENTIALS });
      } else {
        snackbarStore.push({ color: 'error', text: error });
      }
      console.error(error);
    }
  }
}

onMounted(() => {
  if (edit) {
    fetchUser();
  }
  breadcrumb.set({
    back: { name: RouteNames.USER_LIST },
    backLabel: 'Usuarios',
    title: edit ? 'Editar usuario' : 'Añadir usuario',
  });
});
</script>

<style scoped></style>
