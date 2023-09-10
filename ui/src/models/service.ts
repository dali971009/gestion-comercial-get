export interface ServiceGroup {
  name: string
  descriptionLabel?: string
  services: Service[]
}

export interface Service {
  id: number
  description: string
  um?: string
  amount?: number
  price?: number
  category: string
  subcategory?: string
  invoiceFrequency?: InvoiceFrequency
}

export enum InvoiceFrequency {
  OCCASIONALLY,
  MONTHLY,
  EVERY_THREE_MONTHS,
  EVERY_SIX_MONTHS,
  YEARLY
}
