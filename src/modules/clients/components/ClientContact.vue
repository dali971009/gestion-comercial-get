<template>
  <custom-labeled-container :label="position" class="mt-4">
    <v-form class="v-row">
      <responsive-form-field v-if="!position">
        <custom-input label="Cargo" :required="true">
          <v-text-field placeholder="Inserte el cargo" v-model="contact.position" hide-details />
        </custom-input>
      </responsive-form-field>
      <responsive-form-field>
        <custom-input label="Nombre y apellidos" :required="true">
          <v-text-field
            placeholder="Inserte el nombre y los apellidos"
            v-model="contact.fullName"
            hide-details
          />
        </custom-input>
      </responsive-form-field>
      <responsive-form-field>
        <custom-input label="Carnet de identidad" :required="true">
          <v-text-field
            placeholder="Inserte el carnét de identidad"
            v-model="contact.ci"
            hide-details
          />
        </custom-input>
      </responsive-form-field>
      <responsive-form-field>
        <custom-input label="Email" :required="true">
          <v-text-field placeholder="Inserte el email" v-model="contact.email" hide-details />
        </custom-input>
      </responsive-form-field>
      <responsive-form-field>
        <custom-input label="Teléfono" :required="true">
          <v-text-field placeholder="Inserte el teléfono" v-model="contact.phone" hide-details />
        </custom-input>
      </responsive-form-field>
    </v-form>
    <v-btn
      v-if="deletable"
      class="mt-4"
      color="error"
      prepend-icon="mdi-delete"
      @click="handleDelete"
      >Eliminar</v-btn
    >
  </custom-labeled-container>
</template>

<script setup lang="ts">
import { Contact } from '@/models/client'
import { computed, onMounted } from 'vue'
import CustomLabeledContainer from '@/components/CustomLabeledContainer.vue'
import ResponsiveFormField from '@/components/ResponsiveFormField.vue'
import CustomInput from '@/components/CustomInput.vue'

const props = defineProps<{
  modelValue: Contact
  position?: string
  deletable?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'delete'])

const contact = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue ', value)
})

function handleDelete() {
  emit('delete')
}

onMounted(() => {
  if (props.position) {
    if (contact.value.position !== props.position) {
      contact.value.position = props.position
    }
  }
})
</script>

<style scoped></style>
