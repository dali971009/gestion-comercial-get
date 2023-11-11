<template>
  <v-form class="v-row ma-2">
    <responsive-form-field v-if="edit">
      <custom-input label="Numero">
        <v-text-field :value="serviceRequest.number" :disabled="true" />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Fecha de solicitud" required>
        <v-text-field
          v-model="applicationDate"
          placeholder="Seleccione la fecha de solicitud"
          type="date"
          :hide-details="typeof errors.applicationDate === 'undefined'"
          :error-messages="errors.applicationDate"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Entidad solicitante" required>
        <v-fetcher-autocomplete
          v-model="serviceRequest.requestingEntityId"
          placeholder="Inserte la entidad solicitante"
          :fetcher="clientFetcher"
          :hide-details="typeof errors.requestingEntityId === 'undefined'"
          :error-messages="errors.requestingEntityId"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Estado de la solicitud" required>
        <v-autocomplete
          v-model="serviceRequest.status"
          placeholder="Seleccione el estado de la solicitud"
          :items="statuses"
          :hide-details="typeof errors.serviceDescription === 'undefined'"
          :error-messages="errors.serviceDescription"
        />
      </custom-input>
    </responsive-form-field>
    <v-divider class="ma-4" />
    <h3 class="v-col-12">Datos de contacto</h3>
    <responsive-form-field>
      <custom-input label="Nombre completo" required>
        <v-text-field
          v-model="serviceRequest.contactName"
          placeholder="Inserte el nombre completo del contacto"
          :hide-details="typeof errors.contactName === 'undefined'"
          :error-messages="errors.contactName"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Cargo" required>
        <v-text-field
          v-model="serviceRequest.contactPosition"
          placeholder="Inserte el cargo del contacto"
          :hide-details="typeof errors.contactPosition === 'undefined'"
          :error-messages="errors.contactPosition"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Correo">
        <v-text-field
          v-model="serviceRequest.contactEmail"
          placeholder="Inserte el correo del contacto"
          :hide-details="typeof errors.contactEmail === 'undefined'"
          :error-messages="errors.contactEmail"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Teléfono">
        <v-text-field
          v-model="serviceRequest.contactPhoneNumber"
          placeholder="Inserte el teléfono del contacto"
          :hide-details="typeof errors.contactPhoneNumber === 'undefined'"
          :error-messages="errors.contactPhoneNumber"
        />
      </custom-input>
    </responsive-form-field>
    <v-divider class="ma-4" />
    <h3 class="v-col-12">Descripción de las necesidades identificadas</h3>
    <v-textarea
      v-model="serviceRequest.scope"
      placeholder="Inserte el alcance"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.scope === 'undefined'"
      :error-messages="errors.scope"
    />
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { type ServiceRequest, ServiceRequestStatus } from '@/models/service-request';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';
import { useClientLabel } from '@/composable/autocomplete/client';
import VFetcherAutocomplete from '@/components/VFetcherAutocomplete.vue';
import moment from 'moment';

const props = defineProps<{
  modelValue: ServiceRequest;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const serviceRequest = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const clientFetcher = useClientLabel();

const statuses = [
  {
    title: 'En evaluación por el área correspondiente',
    value: ServiceRequestStatus.UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA,
  },
  { title: 'No aceptada por GET', value: ServiceRequestStatus.NOT_ACCEPTED_BY_GET },
  {
    title: 'Pendiente presentación oferta o contrato',
    value: ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING,
  },
  { title: 'En proceso de negociación', value: ServiceRequestStatus.IN_NEGOTIATION_PROCESS },
  { title: 'No aceptada por el cliente', value: ServiceRequestStatus.NOT_ACCEPTED_BY_CLIENT },
  { title: 'Contrato firmado', value: ServiceRequestStatus.SIGNED_CONTRACT },
];

const applicationDate = computed({
  get() {
    return moment(serviceRequest.value.applicationDate).add(5, 'hour').format(moment.HTML5_FMT.DATE);
  },
  set(value) {
    serviceRequest.value.applicationDate = moment(value).subtract(5, 'hour').toISOString();
  },
});

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
