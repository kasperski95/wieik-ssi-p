export interface UserCore {
  id: string;
  email: string;
  password: string;
}

export interface UserCoreRepository {
  findByEmail: (email: string) => Promise<UserCore>;
}

export enum AuthDI {
  userCoreRepository = 'userCoreRepository',
}
