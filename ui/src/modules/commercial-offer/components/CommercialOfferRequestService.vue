<template>
  <v-card class="pa-4">
    <h3>Solicitud de servicio</h3>
    <div>
      <span>Solicitante: {{ serviceRequest.contactName }} ({{ serviceRequest.contactPosition }})</span>
      <br />
      <span v-if="serviceRequest.contactEmail">
        Correo: {{ serviceRequest.contactEmail }}
        <br />
      </span>
      <span v-if="serviceRequest.contactPhoneNumber">
        Teléfono: {{ serviceRequest.contactPhoneNumber }}
        <br />
      </span>
      Alcance: {{ serviceRequest.scope }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { ServiceRequest } from '@/models/service-request';

const props = defineProps<{
  serviceRequest: ServiceRequest;
}>();
</script>

<style scoped>
.total {
  font-size: 14pt;
  font-weight: bold;
}
</style>
