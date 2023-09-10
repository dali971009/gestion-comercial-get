<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Código del cliente" :required="true">
        <v-text-field
          placeholder="Inserte el código del cliente"
          v-model="client.code"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Nombre oficial de la entidad" :required="true">
        <v-text-field
          placeholder="Inserte el nombre oficial de la entidad"
          v-model="client.officialName"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Siglas" :required="true">
        <v-text-field placeholder="Inserte las siglas" v-model="client.acronym" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Fecha de creación" :required="true">
        <v-text-field
          placeholder="Inserte la Fecha de creación"
          type="date"
          v-model="client.creationDate"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Organismo" :required="true">
        <v-text-field placeholder="Inserte el organismo" v-model="client.organism" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="OSDE / Grupo / Unión" :required="true">
        <v-text-field
          placeholder="Inserte OSDE, grupo o unión"
          v-model="client.osdeGroupUnion"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Empresa" :required="true">
        <v-text-field placeholder="Inserte la empresa" v-model="client.company" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Código REEUP U ONE" :required="true">
        <v-text-field
          placeholder="Inserte el código REEUP U ONE"
          v-model="client.codeREEUP"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="NIT" :required="true">
        <v-text-field placeholder="Inserte el nit" v-model="client.nit" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Registro comercial" :required="true">
        <v-text-field
          placeholder="Inserte el registro comercial"
          v-model="client.commercialRegister"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Dirección" :required="true">
        <v-text-field placeholder="Inserte la dirección" v-model="client.address" hide-details />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Municipio" :required="true">
        <v-text-field
          placeholder="Inserte el municipio"
          v-model="client.municipality"
          hide-details
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Provincia" :required="true">
        <v-text-field placeholder="Inserte la provincia" v-model="client.province" hide-details />
      </custom-input>
    </responsive-form-field>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '../../../components/CustomInput.vue'
import { type Client } from '../../../models/client'
import { computed } from 'vue'
import ResponsiveFormField from '../../../components/ResponsiveFormField.vue'

const props = defineProps<{
  modelValue: Client
}>()

const emit = defineEmits(['update:modelValue '])

const client = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue ', value)
})
</script>

<style scoped></style>
