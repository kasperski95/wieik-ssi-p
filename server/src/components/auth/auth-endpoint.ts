import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { UserRepository } from '../user';
import { AuthService } from './auth-service';
import { AuthDI } from './auth-types';

export class AuthEndpoint extends AbstractEndpoint<any> {
  private authService: AuthService;

  constructor(protected route: string, private userRepository: UserRepository) {
    super(route);
    container.registerInstance(AuthDI.userCoreRepository, userRepository);
    this.authService = container.resolve(AuthService);
  }

  main() {
    this.post(async (req, res) => {
      const email = req.body?.email;
      const password = req.body?.password;

      if (!email || !password) throw new APIException(StatusCodes.BAD_REQUEST);

      const result = await this.authService.createJWT(email, password);
      res.send(result);
    });

    this.get(async (req, res) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) throw new APIException(StatusCodes.BAD_REQUEST);

      const id = await this.authService.decodeJWT(token);
      const user = await this.userRepository.findOne(id);

      if (!user) throw new APIException(StatusCodes.NOT_FOUND);
      user.password = '';
      res.send(user);
    });
  }
}
