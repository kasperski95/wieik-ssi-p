import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { EntityRepository } from 'typeorm';
import { APIException } from '../../abstractions/exception';
import { AbstractRepository } from '../../abstractions/repository';
import { UserCoreRepository } from '../auth';
import { UserModel } from './user-model';
import { UserRoles, UserStatus } from './user-types';

@EntityRepository(UserModel)
export class UserRepository
  extends AbstractRepository<UserModel>
  implements UserCoreRepository {
  async createAndSave(data: {
    username: string;
    email: string;
    password: string;
    role: UserRoles;
    status?: UserStatus;
  }) {
    const user = new UserModel();
    user.username = data.username;
    user.email = data.email;
    user.password = await hash(data.password, 10);
    user.role = data.role;
    user.status = data.status || UserStatus.active;

    if (await this.findByEmail(data.email))
      throw new APIException(StatusCodes.UNPROCESSABLE_ENTITY);

    return this.save(user);
  }

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}
