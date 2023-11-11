export enum ServiceRequestStatus {
  UNDER_EVALUATION_BY_THE_CORRESPONDING_AREA = 1,
  NOT_ACCEPTED_BY_GET = 2,
  OFFER_OR_CONTRACT_PRESENTATION_PENDING = 3,
  IN_NEGOTIATION_PROCESS = 4,
  NOT_ACCEPTED_BY_CLIENT = 5,
  SIGNED_CONTRACT = 6,
}

export interface ServiceRequest {
  id?: string;
  number?: number;
  applicationDate?: string;
  requestingEntityId?: string;
  contactName?: string;
  contactPosition?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;
  scope?: string;
  status?: ServiceRequestStatus;
}
