<template>
  <v-form class="v-row ma-2">
    <responsive-form-field>
      <custom-input label="Tipo de servicio" required>
        <v-fetcher-autocomplete
          v-model="service.typeId"
          placeholder="Seleccione el tipo de servicio"
          :fetcher="serviceTypeFetcher"
          :hide-details="typeof errors.typeId === 'undefined'"
          :error-messages="errors.typeId"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Descripción" required>
        <v-text-field
          v-model="service.description"
          placeholder="Inserte la descripción"
          :hide-details="typeof errors.description === 'undefined'"
          :error-messages="errors.description"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Unidad de medida">
        <v-text-field
          v-model="service.unit"
          placeholder="Inserte la unidad de medida"
          :hide-details="typeof errors.unit === 'undefined'"
          :error-messages="errors.unit"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Precio">
        <v-text-field
          v-model="service.price"
          placeholder="Inserte el precio"
          :hide-details="typeof errors.price === 'undefined'"
          :error-messages="errors.price"
        />
      </custom-input>
    </responsive-form-field>
    <responsive-form-field>
      <custom-input label="Frecuencia de facturación">
        <v-autocomplete
          v-model="service.frequency"
          placeholder="Inserte la frecuencia de facturación"
          :items="frequencies"
          :hide-details="typeof errors.frequency === 'undefined'"
          :error-messages="errors.frequency"
        />
      </custom-input>
    </responsive-form-field>
  </v-form>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { InvoiceFrequency, type Service } from '@/models/service';
import { computed } from 'vue';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import type { ErrorHandlerInterface } from '@/helpers/errors/error-handler';
import VFetcherAutocomplete from '@/components/VFetcherAutocomplete.vue';
import { useServiceTypeLabel } from '@/composable/autocomplete/service-type';

const props = defineProps<{
  modelValue: Service;
  edit: boolean;
  errorHandler: ErrorHandlerInterface;
}>();

const emit = defineEmits(['update:modelValue ']);

const service = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue ', value),
});

const serviceTypeFetcher = useServiceTypeLabel();

const frequencies = [
  { title: 'Puntual', value: InvoiceFrequency.OCCASIONALLY },
  { title: 'Mensual', value: InvoiceFrequency.MONTHLY },
  { title: 'Trimestral', value: InvoiceFrequency.EVERY_THREE_MONTHS },
  { title: 'Semestral', value: InvoiceFrequency.EVERY_SIX_MONTHS },
  { title: 'Anual', value: InvoiceFrequency.YEARLY },
];

const errors = computed(() => props.errorHandler.getErrorObj.value);
</script>

<style scoped></style>
