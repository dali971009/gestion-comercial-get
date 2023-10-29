export enum ClientStatus {
  ACTIVE,
  DELETED,
}

export interface Contact {
  position?: string;
  fullName?: string;
  ci?: string;
  email?: string;
  phone?: string;
}

/**
 * Client data
 * @param code: The client id
 */
export interface Client {
  code?: number; // id
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
    executiveStaff: {
      director: Contact;
      economic: Contact;
      it: Contact;
    };
    authorizedPeople: Contact[];
  };
  bankData: {
    bankAccount?: string;
    accountName?: string;
    bank?: string;
  };
  status?: ClientStatus;
}
