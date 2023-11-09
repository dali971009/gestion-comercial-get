<template>
  <v-form class="ma-2">
    <h3>Personal directivo</h3>
    <client-contact v-model="director" position="Director" />
    <client-contact v-model="economic" position="Económico" />
    <client-contact v-model="itPerson" position="Informático" />
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
import { type Client, type Contact } from '@/models/client';
import { computed } from 'vue';
import ClientContact from '@/modules/clients/components/ClientContact.vue';

const props = defineProps<{
  modelValue: Client;
}>();

const emit = defineEmits(['update:modelValue ']);

const client = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const director = computed<Contact>({
  get() {
    return client.value.staff.director ?? { position: 'Director', isMainStaff: true };
  },
  set(value) {
    client.value = { ...client.value, staff: { ...client.value.staff, director: value } };
  },
});

const economic = computed<Contact>({
  get() {
    return client.value.staff.economic ?? { position: 'Económico', isMainStaff: true };
  },
  set(value) {
    client.value = { ...client.value, staff: { ...client.value.staff, economic: value } };
  },
});

const itPerson = computed<Contact>({
  get() {
    return client.value.staff.itPerson ?? { position: 'Informático', isMainStaff: true };
  },
  set(value) {
    client.value = { ...client.value, staff: { ...client.value.staff, itPerson: value } };
  },
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
