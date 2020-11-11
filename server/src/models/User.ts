import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Builder } from '../abstractions/builder';
import { Setup } from './Setup';

export enum UserStatus {
  active = 'active',
  blocked = 'blocked',
}

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
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

  @OneToMany((type) => Setup, (setup) => setup.user)
  setups: Setup[];
}

export class UserBuilder extends Builder<User> {
  private user: User;
  constructor(data: {
    username: string;
    email: string;
    password: string;
    status: UserStatus;
    role: UserRoles;
  }) {
    super();
    this.user = new User();
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.password = data.password;
    this.user.status = data.status;
    this.user.role = data.role;
  }

  build(): User {
    return this.user;
  }
}
