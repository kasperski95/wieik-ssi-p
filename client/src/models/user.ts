import { Setup } from './setup';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRoles;
  setups?: Setup[];
}

export enum UserStatus {
  active = 'active',
  blocked = 'blocked',
}

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}
