import { container } from 'tsyringe';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { AuthTokens } from './auth-constants';
import { AuthService } from './auth-service';
import { UserCoreRepository } from './auth-types';

export class AuthEndpoint extends AbstractEndpoint {
  private authService: AuthService;

  constructor(protected route: string, userCoreRepository: UserCoreRepository) {
    super(route);
    container.registerInstance(
      AuthTokens.userCoreRepository,
      userCoreRepository
    );
    this.authService = container.resolve(AuthService);
  }

  main() {
    this.post(async (req, res) => {
      const result = await this.authService.createJWT('foo', 'bar');
      res.send(result);
    });
  }
}
