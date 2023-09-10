<template>
  <div class="d-flex justify-center align-center fill-height bg-teal-lighten-5">
    <v-card class="d-flex container" rounded="shaped">
      <v-form class="d-flex flex-column align-center py-8 px-16">
        <h2 class="text-center mt-2 mb-4">Bienvenido</h2>
        <v-text-field
          v-model="username"
          placeholder="Usuario"
          prepend-inner-icon="mdi-account-outline"
          style="min-width: 300px"
          :error="hasError"
        />
        <v-text-field
          v-model="password"
          placeholder="Contraseña"
          prepend-inner-icon="mdi-lock-outline"
          style="min-width: 300px"
          type="password"
          :error-messages="hasError ? errorMessage : ''"
        />
        <v-checkbox label="Recordar contraseña" hide-details />
        <a href="#" class="text-decoration-none pt-2 pb-4">¿Olvidó su contraseña?</a>
        <v-btn @click.prevent="login" rounded>Entrar</v-btn>
      </v-form>
      <div class="bg-teal-lighten-1 flex-1-0"></div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouteNames } from '../router/route-names'

const username = ref<string>('')
const password = ref<string>('')

const errorMessage = 'Usuario o contraseña incorrectos'
const hasError = ref<boolean>(false)

const router = useRouter()

function login() {
  hasError.value = false

  if (username.value !== 'admin' || password.value !== 'admin') {
    hasError.value = true
    return
  }

  router.push({ name: RouteNames.DASHBOARD })
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
  color: #26a69a;
}

a {
  color: #26a69a;
}
</style>
