export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  REMOVED = 2,
}

export enum UserEmailStatus {
  NOT_VERIFIED = 0,
  VERIFIED = 1,
}

export interface User {
  id?: number;
  createAt?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  status?: UserStatus;
  emailVerified?: UserEmailStatus;
  address?: string;
  phoneNumber?: string;
}

export interface UserWithPassword extends User {
  password2?: string;
}
