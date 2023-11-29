import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateProductionReportResponse,
  GetProductionReportLabelsResponse,
  GetProductionReportResponse,
  GetProductionReportsResponse, PrintProductionReportResponse,
  UpdateProductionReportResponse,
} from '@/modules/api/models/production-report/production-report-responses';
import type {
  CreateProductionReportRequest,
  GetProductionReportRequest,
  UpdateProductionReportRequest,
} from '@/modules/api/models/production-report/production-report-requests';

export interface ProductionReportApiInterface {
  getProductionReportsRaw(): Promise<AxiosResponse>;
  getProductionReports(): Promise<GetProductionReportsResponse>;
  getProductionReportLabelsRaw(): Promise<AxiosResponse>;
  getProductionReportLabels(): Promise<GetProductionReportLabelsResponse>;
  getProductionReportRaw(request: GetProductionReportRequest): Promise<AxiosResponse>;
  getProductionReport(request: GetProductionReportRequest): Promise<GetProductionReportResponse>;
  createProductionReportRaw(request: CreateProductionReportRequest): Promise<AxiosResponse>;
  createProductionReport(request: CreateProductionReportRequest): Promise<CreateProductionReportResponse>;
  updateProductionReportRaw(request: UpdateProductionReportRequest): Promise<AxiosResponse>;
  updateProductionReport(request: UpdateProductionReportRequest): Promise<UpdateProductionReportResponse>;
  printProductionReportRaw(request: GetProductionReportRequest): Promise<AxiosResponse>;
  printProductionReport(request: GetProductionReportRequest): Promise<PrintProductionReportResponse>;
  printInvoiceRaw(request: GetProductionReportRequest): Promise<AxiosResponse>;
  printInvoice(request: GetProductionReportRequest): Promise<PrintProductionReportResponse>;
}

class ProductionReportApi extends BaseApi implements ProductionReportApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getProductionReportsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/production-report');
  }

  async getProductionReports(): Promise<GetProductionReportsResponse> {
    const response = await this.getProductionReportsRaw();
    return { data: response.data };
  }

  async getProductionReportLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/production-report/labels');
  }

  async getProductionReportLabels(): Promise<GetProductionReportLabelsResponse> {
    const response = await this.getProductionReportLabelsRaw();
    return { data: response.data };
  }

  async getProductionReportRaw(request: GetProductionReportRequest): Promise<AxiosResponse> {
    return this.axios.get(`/production-report/${request.id}`);
  }

  async getProductionReport(request: GetProductionReportRequest): Promise<GetProductionReportResponse> {
    const response = await this.getProductionReportRaw(request);
    return { data: response.data };
  }

  async printProductionReportRaw(request: GetProductionReportRequest): Promise<AxiosResponse> {
    return this.axios.get(`/production-report/${request.id}/pdf`);
  }

  async printProductionReport(request: GetProductionReportRequest): Promise<PrintProductionReportResponse> {
    const response = await this.printProductionReportRaw(request);
    console.log(response);
    return { data: response.data };
  }

  async printInvoiceRaw(request: GetProductionReportRequest): Promise<AxiosResponse> {
    return this.axios.get(`/production-report/${request.id}/pdf/invoice`);
  }

  async printInvoice(request: GetProductionReportRequest): Promise<PrintProductionReportResponse> {
    const response = await this.printProductionReportRaw(request);
    console.log(response);
    return { data: response.data };
  }

  async createProductionReportRaw(request: CreateProductionReportRequest): Promise<AxiosResponse> {
    return this.axios.post(`/production-report`, { ..._.omitBy(request.productionReport, _.isNil) });
  }

  async createProductionReport(request: CreateProductionReportRequest): Promise<CreateProductionReportResponse> {
    const response = await this.createProductionReportRaw(request);
    return { data: response.data };
  }

  async updateProductionReportRaw(request: UpdateProductionReportRequest): Promise<AxiosResponse> {
    return this.axios.put(`/production-report`, { ..._.omitBy(request.productionReport, _.isNil) });
  }

  async updateProductionReport(request: UpdateProductionReportRequest): Promise<UpdateProductionReportResponse> {
    const response = await this.updateProductionReportRaw(request);
    return { data: response.data };
  }
}

export default ProductionReportApi;
