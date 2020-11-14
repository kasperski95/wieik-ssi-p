import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { UserCore } from '../auth';
import { SetupModel } from '../setup/setup-model';
import { UserRoles, UserStatus } from './user-types';

@Entity('user')
export class UserModel implements UserCore {
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
