<template>
  <page-view title="Reportes de producción" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.PRODUCTION_REPORT_NEW }" rounded>
        <v-icon icon="mdi-plus" class="mr-2" />
        Añadir reporte
      </v-btn>
    </template>
    <easy-data-table
      :headers="headers"
      :items="productionReports"
      table-class-name="data-table"
      border-cell
      show-index
      hide-footer
    >
      <template #item-month="item">
        {{ getMonth(item.month) }}
      </template>
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.PRODUCTION_REPORT_EDIT, params: { id: item.id } }">
                <v-icon icon="mdi-pencil" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Editar reporte de producción
          </v-tooltip>
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.PRODUCTION_REPORT_PRINT, params: { id: item.id } }">
                <v-icon class="ml-2" icon="mdi-printer" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Imprimir reporte de producción
          </v-tooltip>
          <v-tooltip>
            <template #activator="attrs">
              <router-link :to="{ name: RouteNames.INVOICE_PRINT, params: { id: item.id } }">
                <v-icon class="ml-2" icon="mdi-receipt" color="primary" v-bind="attrs.props" />
              </router-link>
            </template>
            Imprimir factura
          </v-tooltip>
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { Header } from 'vue3-easy-data-table';
import {onMounted, ref} from 'vue';
import { useBreadCrumb } from '@/stores/breadcrumb';
import type { ProductionReport, ServiceProvided } from '@/models/production-report';
import { makeProductionReportApi} from "@/modules/api/proxy";
import RouteNames from "@/router/route-names";

const breadcrumb = useBreadCrumb();
const productionReports = ref<ProductionReport[]>([]);

const headers: Header[] = [
  { text: 'Área o brigada', value: 'area' },
  { text: 'Periodo', value: 'month' },
  { text: 'Plan de  ingresos', value: 'incomePlan' },
  { text: 'Importe total', value: 'totalAmount' },
  { text: '', value: 'actions', width: 50 },
];

async function fetchProductionReports() {
  const response = await makeProductionReportApi().getProductionReports();
  productionReports.value = response.data;
}

function getMonth(month: number) {
  switch (month) {
    case 0:
      return 'Enero';
    case 1:
      return 'Febrero';
    case 2:
      return 'Marzo';
    case 3:
      return 'Abril';
    case 4:
      return 'Mayo';
    case 5:
      return 'Junio';
    case 6:
      return 'Julio';
    case 7:
      return 'Agosto';
    case 8:
      return 'Septiembre';
    case 9:
      return 'Octubre';
    case 10:
      return 'Noviembre';
    case 11:
      return 'Diciembre';
    default:
      return '';
  }
}

onMounted(() => {
  breadcrumb.set({
    title: 'Reportes de producción',
  });
  fetchProductionReports();
});
</script>

<style scoped></style>
