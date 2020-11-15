import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { inject, singleton } from 'tsyringe';
import { APIException } from '../../abstractions/exception';
import { AuthDI, UserCoreRepository } from './auth-types';

@singleton()
export class AuthService {
  constructor(
    @inject(AuthDI.userCoreRepository)
    private userCoreRepository: UserCoreRepository
  ) {}

  async createJWT(email: string, password: string) {
    const user = await this.userCoreRepository.findByEmail(email);

    if (!user) throw new APIException(StatusCodes.NOT_FOUND);

    if (!bcrypt.compareSync(password, user.password))
      throw new APIException(StatusCodes.UNAUTHORIZED);

    return jwt.sign(user.id, 'foobar');
  }

  async decodeJWT(token: string) {
    return jwt.decode(token) as string;
  }
}
