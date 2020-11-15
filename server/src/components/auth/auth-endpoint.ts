import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { AuthService } from './auth-service';
import { AuthDI, UserCoreRepository } from './auth-types';

export class AuthEndpoint extends AbstractEndpoint<any> {
  private authService: AuthService;

  constructor(protected route: string, userCoreRepository: UserCoreRepository) {
    super(route);
    container.registerInstance(AuthDI.userCoreRepository, userCoreRepository);
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
  }
}
