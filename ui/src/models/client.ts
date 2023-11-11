export enum ClientStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export interface Contact {
  id?: string;
  fullName?: string;
  ci?: string;
  position?: string;
  email?: string;
  phone?: string;
  isMainStaff?: boolean;
}

/**
 * Client data
 * @param code: The client id
 */
export interface Client {
  id?: string;
  code?: number;
  officialName?: string;
  acronym?: string;
  creationDate?: string;
  organism?: string;
  osdeGroupUnion?: string;
  company?: string;
  codeREEUP?: string;
  nit?: string;
  commercialRegister?: string;
  address?: string;
  municipality?: string;
  province?: string;
  staff: {
    director?: Contact;
    economic?: Contact;
    itPerson?: Contact;
    authorizedPeople: Contact[];
  };
  status?: ClientStatus;
  bankAccount?: string;
  accountName?: string;
  bank?: string;
}
