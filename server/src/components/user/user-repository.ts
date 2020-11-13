import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { UserCoreRepository } from '../auth';
import { UserBuilder, UserModel, UserRoles, UserStatus } from './user-model';

@EntityRepository(UserModel)
export class UserRepository
  extends AbstractRepository<UserModel>
  implements UserCoreRepository {
  create(data: { [key: string]: any }): UserModel {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string) {
    const user = new UserBuilder({
      email: 'foo',
      password: 'bar',
      role: UserRoles.admin,
      status: UserStatus.active,
      username: 'foo',
    }).build();
    user.id = 'foo';
    return user;
    return this.repository.findOne({ where: { email } });
  }
}
