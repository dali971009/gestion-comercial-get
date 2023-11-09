<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Nombre" required>
        <v-text-field
          v-model="user.firstName"
          placeholder="Inserte el nombre"
          :hide-details="typeof errors.firstName === 'undefined'"
          :error-messages="errors.firstName"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Apellidos" required>
        <v-text-field
          placeholder="Inserte los apellidos"
          v-model="user.lastName"
          :hide-details="typeof errors.lastName === 'undefined'"
          :error-messages="errors.lastName"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Correo" required>
        <v-text-field
          placeholder="Inserte el correo"
          v-model="user.email"
          :hide-details="typeof errors.email === 'undefined'"
          :error-messages="errors.email"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Estado">
        <v-autocomplete
          placeholder="Seleccione el estado"
          v-model="user.status"
          :items="statuses"
          :hide-details="typeof errors.status === 'undefined'"
          :error-messages="errors.status"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Teléfono">
        <v-text-field
          placeholder="Inserte el teléfono"
          v-model="user.phoneNumber"
          :hide-details="typeof errors.phoneNumber === 'undefined'"
          :error-messages="errors.phoneNumber"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Dirección">
        <v-text-field
          placeholder="Inserte la dirección"
          v-model="user.address"
          :hide-details="typeof errors.address === 'undefined'"
          :error-messages="errors.address"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field v-if="!edit">
      <custom-input label="Contraseña" required>
        <v-text-field
          placeholder="Inserte la contraseña"
          v-model="user.password"
          type="password"
          :hide-details="typeof errors.password === 'undefined'"
          :error-messages="errors.password"
        />
      </custom-input>
    </responsive-form-field>
    <div v-if="edit" class="v-col-12">
      <h3 class="my-3">Cambiar contraseña</h3>
      <div class="v-row">
        <responsive-form-field>
          <custom-input label="Contraseña">
            <v-text-field
              placeholder="Inserte la contraseña"
              v-model="user.password"
              type="password"
              :hide-details="typeof errors.password === 'undefined'"
              :error-messages="errors.password"
            />
          </custom-input>
        </responsive-form-field>
        <responsive-form-field>
          <custom-input label="Contraseña">
            <v-text-field
              placeholder="Repita la contraseña"
              v-model="user.password2"
              type="password"
              :hide-details="typeof errors.password2 === 'undefined'"
              :error-messages="errors.password2"
            />
          </custom-input>
        </responsive-form-field>
      </div>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { type User, UserStatus, UserWithPassword } from '@/models/user';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';

const props = defineProps<{
  modelValue: User | UserWithPassword;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const user = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const statuses = [
  { title: 'Activo', value: UserStatus.ACTIVE },
  { title: 'Inactivo', value: UserStatus.INACTIVE },
  { title: 'Eliminado', value: UserStatus.REMOVED },
];

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
