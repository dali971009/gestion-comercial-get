export interface ServiceGroup {
  id: string;
  name: string;
  description?: string;
  serviceDescription?: string;
  services: Service[];
}

export interface Service {
  id?: string;
  typeId?: string;
  description?: string;
  extraDescription?: string;
  unit?: string;
  price?: number;
  frequency?: InvoiceFrequency;
}

export enum InvoiceFrequency {
  OCCASIONALLY = 1,
  MONTHLY = 2,
  EVERY_THREE_MONTHS = 2,
  EVERY_SIX_MONTHS = 3,
  YEARLY = 4,
}
