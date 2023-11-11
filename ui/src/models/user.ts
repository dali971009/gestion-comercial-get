export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  REMOVED = 3,
}

export enum UserEmailStatus {
  VERIFIED = 1,
  NOT_VERIFIED = 2,
}

export interface User {
  id?: string;
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
