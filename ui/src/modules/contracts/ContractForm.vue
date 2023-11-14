<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Entidad" required>
        <v-fetcher-autocomplete
          v-model="contract.clientId"
          placeholder="Seleccione la entidad"
          :fetcher="clientFetcher"
          :hide-details="typeof errors.clientId === 'undefined'"
          :error-messages="errors.clientId"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Valor del contrato" required>
        <v-text-field
          v-model.number="contract.value"
          placeholder="Inserte el valor del contrato"
          type="number"
          :hide-details="typeof errors.value === 'undefined'"
          :error-messages="errors.value"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Tipo de contrato" required>
        <v-autocomplete
          v-model="contract.type"
          placeholder="Seleccione el tipo de contrato"
          :items="types"
          :hide-details="typeof errors.type === 'undefined'"
          :error-messages="errors.type"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Anticipo pactado">
        <v-text-field
          v-model.number="contract.agreedAdvance"
          placeholder="Inserte el anticipo pactado"
          type="number"
          :hide-details="typeof errors.agreedAdvance === 'undefined'"
          :error-messages="errors.agreedAdvance"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Forma de pago" required>
        <v-autocomplete
          v-model="contract.wayToPay"
          placeholder="Seleccione la forma de pago"
          :items="waysToPay"
          :hide-details="typeof errors.wayToPay === 'undefined'"
          :error-messages="errors.wayToPay"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Fecha de firma">
        <v-text-field
          v-model="signatureDate"
          placeholder="Seleccione la fecha de firma"
          type="date"
          :hide-details="typeof errors.signatureDate === 'undefined'"
          :error-messages="errors.signatureDate"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Vigencia">
        <v-text-field
          v-model="validity"
          placeholder="Seleccione la fecha de vigencia"
          type="date"
          :hide-details="typeof errors.validity === 'undefined'"
          :error-messages="errors.validity"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="CL">
        <v-switch
          v-model="contract.includeCL"
          label="Incluye traspaso de CL sobre el valor contratado"
          :hide-details="typeof errors.includeCL === 'undefined'"
          :error-messages="errors.includeCL"
        />
      </custom-input>
    </responsive-form-field>
    <v-divider class="ma-4" />
    <h3 class="v-col-12">
      Identificación de las partes
      <span class="text-red">*</span>
    </h3>
    <v-textarea
      v-model="contract.identificationOfTheParts"
      placeholder="Inserte la identificación de las partes"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.identificationOfTheParts === 'undefined'"
      :error-messages="errors.identificationOfTheParts"
    />
    <v-divider class="ma-4" />
    <h3 class="v-col-12">
      Objeto del contrato
      <span class="text-red">*</span>
    </h3>
    <v-textarea
      v-model="contract.object"
      placeholder="Inserte el objeto del contrato"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.object === 'undefined'"
      :error-messages="errors.object"
    />
    <v-divider class="ma-4" />
    <h3 class="v-col-12">
      Dictamen Legal
      <span class="text-red">*</span>
    </h3>
    <v-textarea
      v-model="contract.legalOpinion"
      placeholder="Inserte el dictamen Legal"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.legalOpinion === 'undefined'"
      :error-messages="errors.legalOpinion"
    />
    <v-divider class="ma-4" />
    <h3 class="v-col-12">Acuerdo del CA o CD</h3>
    <v-textarea
      v-model="contract.agreement"
      placeholder="Inserte el acuerdo del CA o CD"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.agreement === 'undefined'"
      :error-messages="errors.agreement"
    />
    <v-divider class="ma-4" />
    <h3 class="v-col-12">Observaciones</h3>
    <v-textarea
      v-model="contract.observations"
      placeholder="Inserte las observaciones"
      max-rows="3"
      rows="3"
      no-resize
      class="v-col-12"
      :hide-details="typeof errors.observations === 'undefined'"
      :error-messages="errors.observations"
    />
    <v-divider />
    <div class="v-row ma-4">
      <template v-for="(oldVersion, i) in contract.oldVersions" :key="`oldVersion_${i}`">
        <contract-old-version class="v-col-6" :is-original="i === 0" :old-version="oldVersion" />
      </template>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { type Contract, ContractType } from '@/models/contract';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';
import { useClientLabel } from '@/composable/autocomplete/client';
import VFetcherAutocomplete from '@/components/VFetcherAutocomplete.vue';
import moment from 'moment';
import { WayToPay } from '@/models/commercial-offer';
import ContractOldVersion from '@/modules/contracts/components/ContractOldVersion.vue';

const props = defineProps<{
  modelValue: Contract;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const contract = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const clientFetcher = useClientLabel();

const types = [
  { title: 'Contrato de prestación de servicios', value: ContractType.CONTRACT_OF_SERVICE },
  { title: 'Contrato de Comodato', value: ContractType.LOAN_AGREEMENT },
  { title: 'Documentación de Proyectos', value: ContractType.PROJECT_DOCUMENTATION },
  { title: 'Ejecución de obras', value: ContractType.EXECUTION_OF_WORK },
  { title: 'Contrato de Arrendamiento', value: ContractType.LEASING_CONTRACT },
];

const waysToPay = [
  { title: 'Efectivo', value: WayToPay.CASH },
  { title: 'Transferencia', value: WayToPay.TRANSFER },
  { title: 'Mixto', value: WayToPay.MIXED },
];

const signatureDate = computed({
  get() {
    if (contract.value.signatureDate !== undefined) {
      return moment(contract.value.signatureDate).add(5, 'hour').format(moment.HTML5_FMT.DATE);
    }
    return undefined;
  },
  set(value) {
    contract.value.signatureDate = moment(value).subtract(5, 'hour').toISOString();
  },
});

const validity = computed({
  get() {
    if (contract.value.validity !== undefined) {
      return moment(contract.value.validity).add(5, 'hour').format(moment.HTML5_FMT.DATE);
    }
    return undefined;
  },
  set(value) {
    contract.value.validity = moment(value).subtract(5, 'hour').toISOString();
  },
});

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
