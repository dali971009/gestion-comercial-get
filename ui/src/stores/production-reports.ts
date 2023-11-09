import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ProductionReport } from '../models/production-report';

export const useProductionReportsStore = defineStore('productionReports', () => {
  const productionReports = ref<ProductionReport[]>([]);

  return { productionReports };
});
