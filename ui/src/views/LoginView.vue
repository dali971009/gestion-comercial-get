<template>
  <div class="d-flex justify-center align-center fill-height bg-loginBackground">
    <v-card class="d-flex container" rounded="shaped">
      <v-form class="d-flex flex-column align-center py-8 px-16">
        <h2 class="text-center mt-2 mb-8 text-primary">Bienvenido</h2>
        <v-text-field
          v-model="email"
          placeholder="Correo"
          prepend-inner-icon="mdi-account-outline"
          style="width: 300px"
          :error-messages="errors.email"
        />
        <v-text-field
          v-model="password"
          placeholder="Contraseña"
          prepend-inner-icon="mdi-lock-outline"
          style="width: 300px"
          type="password"
          :error-messages="errors.password"
        />
        <div class="d-flex justify-space-between align-center align-self-stretch mt-8 mb-2">
          <a href="#" class="text-decoration-none text-primary">¿Olvidó su contraseña?</a>
          <v-btn @click.prevent="login" rounded="8" :disabled="isLoading">
            <template v-if="isLoading" #prepend>
              <v-progress-circular size="14" width="2" indeterminate />
            </template>
            Entrar
          </v-btn>
        </div>
      </v-form>
      <div class="flex-1-0 bg-primary"></div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import RouteNames from '@/router/route-names';
import { AxiosError } from 'axios';
import { useErrorHandler } from '@/helpers/errors/error-handler';
import { useAuth, useSnackBar } from '@/stores';
import { messages } from '@/helpers/messages';

const email = ref<string>('');
const password = ref<string>('');

const errorHandler = useErrorHandler();
const errors = errorHandler.getErrorObj;

const isLoading = ref<boolean>(false);

const router = useRouter();
const authStore = useAuth();
const snackbarStore = useSnackBar();

async function login() {
  errorHandler.reset();
  isLoading.value = true;

  try {
    await authStore
      .newSession({ email: email.value, password: password.value })
      .then(() => {
        isLoading.value = false;
      })
      .catch(error => {
        throw error;
      });
    await router.push({ name: RouteNames.DASHBOARD });
  } catch (error: any) {
    if (!errorHandler.handleErrorResponse(error)) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        snackbarStore.push({ color: 'error', text: messages.AUTH.WRONG_CREDENTIALS });
      } else {
        snackbarStore.push({ color: 'error', text: error });
      }
      console.error(error);
    }
    isLoading.value = false;
  }
}
</script>

<style scoped>
.container {
  min-width: 724px;
}
.v-btn {
  color: white !important;
}
h2 {
  font-size: 24pt;
}
</style>
