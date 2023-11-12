export enum WayToPay {
  CASH = 1,
  TRANSFER = 2,
  MIXED = 3,
}

export interface CommercialOffer {
  id?: string;
  serviceRequestId?: string;
  clientId?: string;
  wayToPay?: WayToPay;
  minimumRequirements?: string;
  services: CommercialOfferService[];
}

export interface CommercialOfferService {
  id?: string;
  serviceId?: string;
  quantity?: number;
  price?: number;
  commercialOfferId?: string;
}
