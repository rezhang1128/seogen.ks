export enum Roles {
  None = 0,
  Admin = 1 << 0,
  User = 1 << 1,
  All = ~(~0 << 2),
}

export type RoleStr = keyof typeof Roles;
