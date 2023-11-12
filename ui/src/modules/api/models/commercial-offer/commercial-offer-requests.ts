import type { CommercialOffer } from '@/models/commercial-offer';

export interface GetCommercialOfferRequest {
  id: string;
}

export interface CreateCommercialOfferRequest {
  commercialOffer: CommercialOffer;
}

export interface UpdateCommercialOfferRequest {
  commercialOffer: CommercialOffer;
}
