import { User as UserModel } from '@src/models/user';
import { BlocState } from '@src/modules/react-bloc';

export abstract class UserState extends BlocState {}

export class Identifying extends UserState {}

export class Guest extends UserState {}

export class Banned extends UserState {}

export class Authenticated extends UserState {
  constructor(public user: UserModel, public jwt: string) {
    super();
  }
}

export class User extends Authenticated {
  constructor(public user: UserModel, public jwt: string) {
    super(user, jwt);
  }
}

export class Admin extends Authenticated {
  constructor(public user: UserModel, public jwt: string) {
    super(user, jwt);
  }
}
