import type { ProductionReport } from '@/models/production-report';

export interface GetProductionReportRequest {
  id: string;
}

export interface CreateProductionReportRequest {
  productionReport: ProductionReport;
}

export interface UpdateProductionReportRequest {
  productionReport: ProductionReport;
}
