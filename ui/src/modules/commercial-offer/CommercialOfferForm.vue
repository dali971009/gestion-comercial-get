<template>
  <v-form class="v-row ma-2">
    <commercial-offer-request-service
      class="v-col-12 mb-4"
      v-if="typeof serviceRequest !== 'undefined'"
      :service-request="serviceRequest"
    />
    <responsive-form-field>
      <custom-input label="Entidad" required>
        <v-fetcher-autocomplete
          v-model="commercialOffer.clientId"
          placeholder="Seleccione la entidad"
          :fetcher="clientFetcher"
          :disabled="typeof serviceRequest !== 'undefined'"
          :hide-details="typeof errors.clientId === 'undefined'"
          :error-messages="errors.clientId"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Forma de pago" required>
        <v-autocomplete
          v-model="commercialOffer.wayToPay"
          placeholder="Seleccione la forma de pago"
          :items="waysToPay"
          :hide-details="typeof errors.wayToPay === 'undefined'"
          :error-messages="errors.wayToPay"
        />
      </custom-input>
    </responsive-form-field>
    <v-divider class="ma-4" />
    <div class="v-col-12 d-flex align-center justify-sm-space-between">
      <h3>Servicios ({{ commercialOffer.services.length }})</h3>
      <v-btn class="text-subtitle-1" style="color: white" @click="addService" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir servicio
      </v-btn>
    </div>
    <template v-for="(service, i) in commercialOffer.services" :key="`service_${i}`">
      <commercial-offer-service
        v-model="commercialOffer.services[i]"
        :services="services"
        :errors="errors"
        :error-prefix="`services[${i}].`"
        @delete="deleteService(i)"
      />
    </template>
    <v-divider class="ma-4" />
    <h3 class="v-col-12">Requerimientos mínimos</h3>
    <v-textarea
      v-model="commercialOffer.minimumRequirements"
      placeholder="Inserte los requerimientos mínimos"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.minimumRequirements === 'undefined'"
      :error-messages="errors.minimumRequirements"
    />
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { type CommercialOffer, WayToPay } from '@/models/commercial-offer';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';
import { useClientLabel } from '@/composable/autocomplete/client';
import VFetcherAutocomplete from '@/components/VFetcherAutocomplete.vue';
import CommercialOfferService from '@/modules/commercial-offer/components/CommercialOfferService.vue';
import type { Service } from '@/models/service';
import CommercialOfferRequestService from '@/modules/commercial-offer/components/CommercialOfferRequestService.vue';
import type { ServiceRequest } from '@/models/service-request';

const props = defineProps<{
  modelValue: CommercialOffer;
  services: Service[];
  serviceRequest?: ServiceRequest;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const commercialOffer = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const clientFetcher = useClientLabel();

function addService() {
  commercialOffer.value.services?.push({});
}

function deleteService(index: number) {
  commercialOffer.value.services?.splice(index, 1);
}

const waysToPay = [
  { title: 'Efectivo', value: WayToPay.CASH },
  { title: 'Transferencia', value: WayToPay.TRANSFER },
  { title: 'Mixto', value: WayToPay.MIXED },
];

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
