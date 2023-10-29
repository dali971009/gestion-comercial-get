<template>
  <v-form class="ma-2">
    <h3>Personal directivo</h3>
    <client-contact v-model="client.staff.executiveStaff.director" position="Director" />
    <client-contact v-model="client.staff.executiveStaff.economic" position="Económico" />
    <client-contact v-model="client.staff.executiveStaff.it" position="Informático" />
    <div class="d-flex align-center mt-6">
      <h3>
        Personas autorizadas por la entidad a operar con el prestador ({{ client.staff.authorizedPeople.length }}/3)
      </h3>
      <v-spacer />
      <v-btn
        :disabled="client.staff.authorizedPeople.length >= 3"
        class="text-subtitle-1"
        style="color: white"
        @click="addAuthorizedPerson"
        rounded
      >
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir persona autorizada
      </v-btn>
    </div>
    <div v-if="client.staff.authorizedPeople.length === 0" class="mb-4">No hay personas autorizadas.</div>
    <template v-for="(person, i) in client.staff.authorizedPeople.length" :key="'person_' + i">
      <client-contact v-model="client.staff.authorizedPeople[i]" @delete="deleteAuthorizedPerson(i)" deletable />
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { type Client } from '../../../models/client';
import { computed } from 'vue';
import ClientContact from '../components/ClientContact.vue';

const props = defineProps<{
  modelValue: Client;
}>();

const emit = defineEmits(['update:modelValue ']);

const client = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

function addAuthorizedPerson() {
  if (client.value.staff.authorizedPeople.length < 3) {
    client.value.staff.authorizedPeople.push({
      position: '',
      fullName: '',
      ci: '',
    });
  }
}

function deleteAuthorizedPerson(index: number) {
  client.value.staff.authorizedPeople.splice(index, 1);
}
</script>

<style scoped></style>
