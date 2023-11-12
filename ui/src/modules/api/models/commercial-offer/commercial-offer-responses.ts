import type { CommercialOffer } from '@/models/commercial-offer';
import type { LabelResult } from '@/models/label-result';

export interface GetCommercialOffersResponse {
  data: CommercialOffer[];
}

export interface GetCommercialOfferLabelsResponse {
  data: LabelResult[];
}

export interface GetCommercialOfferResponse {
  data: CommercialOffer;
}

export interface CreateCommercialOfferResponse {
  data: CommercialOffer;
}

export interface UpdateCommercialOfferResponse {
  data: CommercialOffer;
}
