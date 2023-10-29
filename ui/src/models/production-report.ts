import {Client} from "./client";
import {Service} from "./service";

enum ServiceProvidedModality {
    EQUAL,
    PUNCTUAL,
}

export interface ServiceProvided {
    client: Client,
    service: Service,
    contractNumber: number,
    quantity: number,
    amount: number,
    costCenter: number,
    modality: ServiceProvidedModality,
    period: string,
    invoiceNumber: number,
}

export interface PersonInvolved {
    fullName: string,
    position: string,
    date: Date,
}

export interface ProductionReport {
    id: number,
    area: string,
    period: string,
    incomePlan: number,
    providedServices: ServiceProvided[],
    totalAmount: number,
    madeBy: PersonInvolved,
    reconciledWith: PersonInvolved,
    approvedBy: PersonInvolved,
}