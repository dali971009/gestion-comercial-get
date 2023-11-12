import type { AxiosInstance, AxiosResponse } from 'axios';
import BaseApi from './base';
import _ from 'lodash';
import type {
  CreateCommercialOfferResponse,
  GetCommercialOfferLabelsResponse,
  GetCommercialOfferResponse,
  GetCommercialOffersResponse,
  UpdateCommercialOfferResponse,
} from '@/modules/api/models/commercial-offer/commercial-offer-responses';
import type {
  CreateCommercialOfferRequest,
  GetCommercialOfferRequest,
  UpdateCommercialOfferRequest,
} from '@/modules/api/models/commercial-offer/commercial-offer-requests';

export interface CommercialOfferApiInterface {
  getCommercialOffersRaw(): Promise<AxiosResponse>;
  getCommercialOffers(): Promise<GetCommercialOffersResponse>;
  getCommercialOfferLabelsRaw(): Promise<AxiosResponse>;
  getCommercialOfferLabels(): Promise<GetCommercialOfferLabelsResponse>;
  getCommercialOfferRaw(request: GetCommercialOfferRequest): Promise<AxiosResponse>;
  getCommercialOffer(request: GetCommercialOfferRequest): Promise<GetCommercialOfferResponse>;
  createCommercialOfferRaw(request: CreateCommercialOfferRequest): Promise<AxiosResponse>;
  createCommercialOffer(request: CreateCommercialOfferRequest): Promise<CreateCommercialOfferResponse>;
  updateCommercialOfferRaw(request: UpdateCommercialOfferRequest): Promise<AxiosResponse>;
  updateCommercialOffer(request: UpdateCommercialOfferRequest): Promise<UpdateCommercialOfferResponse>;
}

class CommercialOfferApi extends BaseApi implements CommercialOfferApiInterface {
  constructor(axios: AxiosInstance) {
    super(axios);
  }

  async getCommercialOffersRaw(): Promise<AxiosResponse> {
    return this.axios.get('/commercial-offers');
  }

  async getCommercialOffers(): Promise<GetCommercialOffersResponse> {
    const response = await this.getCommercialOffersRaw();
    return { data: response.data };
  }

  async getCommercialOfferLabelsRaw(): Promise<AxiosResponse> {
    return this.axios.get('/commercial-offers/labels');
  }

  async getCommercialOfferLabels(): Promise<GetCommercialOfferLabelsResponse> {
    const response = await this.getCommercialOfferLabelsRaw();
    return { data: response.data };
  }

  async getCommercialOfferRaw(request: GetCommercialOfferRequest): Promise<AxiosResponse> {
    return this.axios.get(`/commercial-offers/${request.id}`);
  }

  async getCommercialOffer(request: GetCommercialOfferRequest): Promise<GetCommercialOfferResponse> {
    const response = await this.getCommercialOfferRaw(request);
    return { data: response.data };
  }

  async createCommercialOfferRaw(request: CreateCommercialOfferRequest): Promise<AxiosResponse> {
    return this.axios.post(`/commercial-offers`, { ..._.pickBy(request.commercialOffer) });
  }

  async createCommercialOffer(request: CreateCommercialOfferRequest): Promise<CreateCommercialOfferResponse> {
    const response = await this.createCommercialOfferRaw(request);
    return { data: response.data };
  }

  async updateCommercialOfferRaw(request: UpdateCommercialOfferRequest): Promise<AxiosResponse> {
    return this.axios.put(`/commercial-offers`, { ..._.pickBy(request.commercialOffer) });
  }

  async updateCommercialOffer(request: UpdateCommercialOfferRequest): Promise<UpdateCommercialOfferResponse> {
    const response = await this.updateCommercialOfferRaw(request);
    return { data: response.data };
  }
}

export default CommercialOfferApi;
