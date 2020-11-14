import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { inject, singleton } from 'tsyringe';
import { APIException } from '../../abstractions/exception';
import { AuthTokens } from './auth-constants';
import { UserCoreRepository } from './auth-types';

@singleton()
export class AuthService {
  constructor(
    @inject(AuthTokens.userCoreRepository)
    private userCoreRepository: UserCoreRepository
  ) {}

  async createJWT(email: string, password: string) {
    const user = await this.userCoreRepository.findByEmail(email);

    if (!user) throw new APIException(StatusCodes.NOT_FOUND);

    if (!bcrypt.compareSync(password, user.password))
      throw new APIException(StatusCodes.UNAUTHORIZED);

    return jwt.sign('foo', 'foobar');
  }
}
