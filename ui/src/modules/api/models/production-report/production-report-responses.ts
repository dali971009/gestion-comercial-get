import type { ProductionReport } from '@/models/production-report';
import type { LabelResult } from '@/models/label-result';

export interface GetProductionReportsResponse {
  data: ProductionReport[];
}

export interface GetProductionReportLabelsResponse {
  data: LabelResult[];
}

export interface GetProductionReportResponse {
  data: ProductionReport;
}

export interface CreateProductionReportResponse {
  data: ProductionReport;
}

export interface UpdateProductionReportResponse {
  data: ProductionReport;
}

export interface PrintProductionReportResponse {
  data: string;
}
