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
  OCCASIONALLY,
  MONTHLY,
  EVERY_THREE_MONTHS,
  EVERY_SIX_MONTHS,
  YEARLY,
}
