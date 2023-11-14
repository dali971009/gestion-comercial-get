<template>
  <div class="px-2">
    <v-card class="pa-4">
      <h3>{{ isOriginal ? 'Contrato' : 'Suplemento' }}</h3>
      <div>
        <span>
          <b>Fecha de creación:</b>
          {{ formatDate(oldVersion.createAt) }}
        </span>
        <br />
        <span>
          <b>Valor:</b>
          {{ oldVersion.value }}
        </span>
        <br />
        <span>
          <b>Tipo de contrato:</b>
          {{ getTypeName(oldVersion.type) }}
        </span>
        <br />
        <span>
          <b>Fecha de firma:</b>
          {{ formatDate(oldVersion.signatureDate) }}
        </span>
        <br />
        <span>
          <b>Vigencia:</b>
          {{ formatDate(oldVersion.validity) }}
        </span>
        <br />
        <span>
          <b>Forma de pago:</b>
          {{ getWayToPayName(oldVersion.wayToPay) }}
        </span>
        <br />
        <div v-if="oldVersion.agreedAdvance">
          <span>
            <b>Anticipo pactado:</b>
            {{ oldVersion.agreedAdvance }}
          </span>
          <br />
        </div>
        <span>
          <b>Incluye traspaso de CL sobre el valor contratado:</b>
          {{ oldVersion.includeCL ? 'Si' : 'No' }}
        </span>
        <br />
        <div v-if="oldVersion.identificationOfTheParts">
          <b>Identificación de las partes:</b>
          <br />
          {{ oldVersion.identificationOfTheParts }}
          <br />
        </div>
        <div v-if="oldVersion.object">
          <b>Objeto del contrato:</b>
          <br />
          {{ oldVersion.object }}
          <br />
        </div>
        <div v-if="oldVersion.legalOpinion">
          <b>Dictamen Legal:</b>
          <br />
          {{ oldVersion.legalOpinion }}
          <br />
        </div>
        <div v-if="oldVersion.agreement">
          <b>Acuerdo del CA o CD:</b>
          <br />
          {{ oldVersion.agreement }}
          <br />
        </div>
        <div v-if="oldVersion.observations">
          <b>Observaciones:</b>
          <br />
          {{ oldVersion.observations }}
          <br />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { ContractOldVersion } from '@/models/contract';
import moment from 'moment/moment';
import { ContractType } from '@/models/contract';
import { WayToPay } from '@/models/commercial-offer';

defineProps<{
  oldVersion: ContractOldVersion;
  isOriginal: boolean;
}>();

function formatDate(date: Date | undefined) {
  if (typeof date === 'undefined' || date === null) {
    return '-';
  }
  return moment(date).add(5, 'hour').format(moment.HTML5_FMT.DATE);
}

function getTypeName(type: ContractType) {
  switch (type) {
    case ContractType.CONTRACT_OF_SERVICE:
      return 'Contrato de prestación de servicios';
    case ContractType.LOAN_AGREEMENT:
      return 'Contrato de Comodato';
    case ContractType.PROJECT_DOCUMENTATION:
      return 'Documentación de Proyectos';
    case ContractType.EXECUTION_OF_WORK:
      return 'Ejecución de obras';
    case ContractType.LEASING_CONTRACT:
      return 'Contrato de Arrendamiento';
    default:
      return '';
  }
}

function getWayToPayName(way: WayToPay) {
  switch (way) {
    case WayToPay.CASH:
      return 'Efectivo';
    case WayToPay.TRANSFER:
      return 'Transferencia';
    case WayToPay.MIXED:
      return 'Mixto';
    default:
      return '';
  }
}
</script>

<style scoped>
.total {
  font-size: 14pt;
  font-weight: bold;
}
</style>
