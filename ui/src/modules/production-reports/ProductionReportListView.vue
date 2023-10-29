<template>
  <page-view title="Reportes de producción" :use-card="false">
    <template #actions>
      <v-btn class="text-subtitle-1" :to="{ name: RouteNames.PRODUCTION_REPORT_NEW }" rounded
        ><v-icon icon="mdi-plus" class="mr-2" />
        Añadir reporte
      </v-btn>
    </template>
    <easy-data-table
      :headers="headers"
      :items="productionReportsStore.productionReports"
      table-class-name="data-table"
      border-cell
      hide-footer
    >
      <template #item-actions="item">
        <div class="d-flex justify-center">
          <v-btn
            variant="flat"
            height="28"
            class="text-none"
            prepend-icon="mdi-pencil"
            color="blue"
            :to="{ name: RouteNames.PRODUCTION_REPORT_EDIT, params: { id: item.id } }"
            >Editar</v-btn
          >
        </div>
      </template>
    </easy-data-table>
  </page-view>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/route-names'
import PageView from '@/components/PageView.vue'
import { useProductionReportsStore } from '@/stores/production-reports'
import { Header } from 'vue3-easy-data-table'
import { onMounted } from 'vue'
import { useBreadCrumb } from '@/stores/breadcrumb'

const breadcrumb = useBreadCrumb()
const productionReportsStore = useProductionReportsStore()

const headers: Header[] = [
  { text: 'Id', value: 'id' },
  { text: 'Área o brigada', value: 'area' },
  { text: 'Periodo', value: 'period' },
  { text: 'Plan de  ingresos', value: 'incomePlan' },
  { text: 'Servicios brindados', value: 'totalAmount' },
  { text: 'Importe total', value: 'nit' },
]

onMounted(() => {
  breadcrumb.set({
    title: 'Reportes de producción'
  })
})
</script>

<style scoped>
.v-btn {
  color: white;
}
.data-table {
  --easy-table-header-font-color: white;
  --easy-table-header-background-color: #26a69a;
}
</style>
