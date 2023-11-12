<template>
  <custom-input label="Servicio" class="v-col-12" required>
    <v-fetcher-autocomplete
      v-model="service.serviceId"
      :fetcher="serviceFetcher"
      placeholder="Seleccione el servicio"
      :hide-details="typeof errors[errorPrefix + 'serviceId'] === 'undefined'"
      :error-messages="errors[errorPrefix + 'serviceId']"
    />
  </custom-input>
  <responsive-form-field>
    <custom-input :label="quantityLabel" required>
      <v-text-field
        v-model.number="service.quantity"
        placeholder="Inserte la cantidad"
        type="number"
        :hide-details="typeof errors[errorPrefix + 'quantity'] === 'undefined'"
        :error-messages="errors[errorPrefix + 'quantity']"
      />
    </custom-input>
  </responsive-form-field>
  <responsive-form-field>
    <custom-input label="Precio" required>
      <v-text-field
        v-model.number="service.price"
        placeholder="Inserte la tarifa"
        type="number"
        :disabled="typeof selectedService?.price !== 'undefined' && selectedService?.price !== null"
        :hide-details="typeof errors[errorPrefix + 'price'] === 'undefined'"
        :error-messages="errors[errorPrefix + 'price']"
      />
    </custom-input>
  </responsive-form-field>
  <div class="v-col-4 d-flex justify-sm-space-between">
    <div class="d-flex flex-column">
      <span>Total</span>
      <span class="total mt-4">{{ totalLabel }}</span>
    </div>
    <v-btn class="align-self-end mb-2" color="error" prepend-icon="mdi-delete" @click="handleDelete">Eliminar</v-btn>
  </div>
</template>

<script setup lang="ts">
import type { CommercialOfferService } from '@/models/commercial-offer';
import { computed, ref, watch } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useServiceLabel } from '@/composable/autocomplete/service';
import VFetcherAutocomplete from '@/components/VFetcherAutocomplete.vue';
import type { Service } from '@/models/service';

const emit = defineEmits(['update:modelValue', 'delete']);

const props = defineProps<{
  modelValue: CommercialOfferService;
  services: Service[];
  errors: { [p: string]: string };
  errorPrefix: string;
}>();

const service = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const serviceFetcher = useServiceLabel();
const selectedService = ref<Service>();

watch(
  () => service.value.serviceId,
  newValue => {
    selectedService.value = props.services.find(it => it.id === newValue);
    if (selectedService.value !== undefined) {
      service.value.price = selectedService.value.price;
    }
  }
);

const quantityLabel = computed(() => {
  if (selectedService.value?.unit !== undefined && selectedService.value?.unit !== null) {
    return `Cantidad (${selectedService.value.unit})`;
  } else {
    return 'Cantidad';
  }
});

const totalLabel = computed(() => {
  if (service.value.quantity !== undefined && service.value.price !== undefined) {
    return `$${(service.value.quantity * service.value.price).toFixed(2)}`;
  } else {
    return '$0';
  }
});

function handleDelete() {
  emit('delete');
}
</script>

<style scoped>
.total {
  font-size: 14pt;
  font-weight: bold;
}
</style>
