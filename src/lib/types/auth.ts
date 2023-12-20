import { Roles } from "./roles";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Roles;
  createdAt?: Date;
};

export type UserAuthenticationWithPasswordSuccess = {
  item: User;
  sessionToken: string;
};

export type UserAuthenticationWithPasswordFailure = {
  message: string;
};

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordSuccess
  | UserAuthenticationWithPasswordFailure;
