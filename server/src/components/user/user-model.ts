import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Builder } from '../../abstractions/builder';
import { SetupModel } from '../setup/setup-model';

export enum UserStatus {
  active = 'active',
  blocked = 'blocked',
}

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('text')
  status: UserStatus;

  @Column('text')
  role: UserRoles;

  @OneToMany((type) => SetupModel, (setup) => setup.user)
  setups: SetupModel[];
}

export class UserBuilder extends Builder<UserModel> {
  private user: UserModel;
  constructor(data: {
    username: string;
    email: string;
    password: string;
    status: UserStatus;
    role: UserRoles;
  }) {
    super();
    this.user = new UserModel();
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.password = data.password;
    this.user.status = data.status;
    this.user.role = data.role;
  }

  build(): UserModel {
    return this.user;
  }
}
