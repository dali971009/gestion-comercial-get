<template>
  <page-view title="Añadir cliente" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" style="color: white" @click="handleSave" rounded>
        <v-icon icon="mdi-check" class="mr-2" />
        Guardar
      </v-btn>
    </template>
    <v-form>
      <v-sheet class="v-row ma-2 pa-4 mb-4" border>
        <v-row>
          <responsive-form-field>
            <custom-input label="Área o brigada" :required="true">
              <v-text-field placeholder="Inserte el área o brigada" v-model="productionReport.area" hide-details />
            </custom-input>
          </responsive-form-field>
          <responsive-form-field>
            <custom-input label="Periodo" :required="true">
              <v-text-field placeholder="Inserte el periodo" v-model="productionReport.period" hide-details />
            </custom-input>
          </responsive-form-field>
          <responsive-form-field>
            <custom-input label="Plan de ingresos" :required="true">
              <v-text-field
                placeholder="Inserte el plan de ingresos"
                v-model="productionReport.incomePlan"
                type="number"
                hide-details
              />
            </custom-input>
          </responsive-form-field>
        </v-row>
      </v-sheet>
      <v-sheet class="v-row ma-2 pa-4" border>
        <div class="d-flex">
          <h2>Servicios brindados ({{ productionReport.providedServices.length }})</h2>
          <v-spacer />
          <v-btn class="text-subtitle-1" style="color: white" @click="addServiceProvided" rounded>
            <v-icon icon="mdi-plus" class="mr-2" />
            Añadir
          </v-btn>
        </div>
        <div v-if="productionReport.providedServices.length === 0">No hay datos de servicios brindados.</div>
        <div v-else>
          <v-sheet
            class="v-row ma-2 pa-4"
            v-for="(service, index) in productionReport.providedServices"
            :key="'service_' + index"
            border
          >
            <service-provided-form
              v-model="productionReport.providedServices[index]"
              @delete="deleteProvidedService(index)"
            />
          </v-sheet>
        </div>
        <h3>Importe total: {{ totalAmount }}</h3>
      </v-sheet>
    </v-form>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import { computed, onMounted, ref, watch } from 'vue';
import { RouteNames } from '@/router/route-names';
import { useRoute } from 'vue-router';
import { useClientsStore } from '@/stores/clients';
import router from '../../router';
import ResponsiveFormField from '@/components/ResponsiveFormField.vue';
import CustomInput from '@/components/CustomInput.vue';
import { ProductionReport, ServiceProvided } from '@/models/production-report';
import ClientPicker from '@/modules/production-reports/components/ClientPicker.vue';
import ServicePicker from '@/modules/production-reports/components/ServicePicker.vue';
import ServiceProvidedForm from '@/modules/production-reports/components/ServiceProvidedForm.vue';
import ClientContact from '@/modules/clients/components/ClientContact.vue';

const breadcrumb = useBreadCrumb();
const route = useRoute();
const clientsStore = useClientsStore();

const edit = route.name === RouteNames.PRODUCTION_REPORT_EDIT;
const productionReportId = parseInt(route.params.client_code?.toString() ?? '');

const productionReport = ref<ProductionReport>({
  providedServices: [],
});

function addServiceProvided() {
  productionReport.value.providedServices.push({});
}

const totalAmount = computed(() => {
  let total = 0;
  for (const providedService of productionReport.value.providedServices) {
    if (
      providedService.service !== undefined &&
      providedService.service.price !== undefined &&
      providedService.quantity !== undefined
    ) {
      total += providedService.service.price * providedService.quantity;
    }
  }
  return total;
});

function loadClient() {
  productionReport.value = clientsStore.loadClient(productionReportId);
}

function handleSave() {
  if (edit) {
    clientsStore.updateClient(productionReportId, productionReport.value);
  } else {
    clientsStore.addClient(productionReport.value);
  }
  router.push({ name: RouteNames.CLIENT_LIST });
}

onMounted(() => {
  if (edit) {
    loadClient();
  }
  breadcrumb.set({
    back: { name: RouteNames.CLIENT_LIST },
    backLabel: 'Reportes de producción',
    title: edit ? 'Editar reporte' : 'Añadir reporte',
  });
});

function deleteProvidedService(index: number) {
  productionReport.value.providedServices.splice(index, 1);
}
</script>

<style scoped></style>
