import express from 'express';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { AuthEndpoint } from './components/auth';
import { AuthService } from './components/auth/auth-service';
import { BrandRepository } from './components/brand';
import { BrandEndpoint } from './components/brand/brand-endpoint';
import { CarEndpoint, CarRepository } from './components/car';
import { SetupEndpoint, SetupRepository } from './components/setup';
import { TrackEndpoint, TrackRepository } from './components/track';
import { UserEndpoint } from './components/user/user-endpoint';
import { UserRepository } from './components/user/user-repository';
import { DI } from './types/enums';

export class App {
  constructor(
    private connection: Connection,
    private config: { apiVersion: string }
  ) {}

  main(config: { port: number; onStart: () => void }) {
    this.registerRepositories();
    const app = express();
    app.use(express.json());

    [
      new AuthEndpoint('auth', container.resolve(DI.userRepository)),
      new BrandEndpoint('brand', container.resolve(DI.brandRepository)),
      new CarEndpoint('car', container.resolve(DI.carRepository)),
      new SetupEndpoint('setup', container.resolve(DI.setupRepository)),
      new TrackEndpoint('track', container.resolve(DI.trackRepository)),
      new UserEndpoint('user', container.resolve(DI.userRepository)),
    ].forEach((endpoint) =>
      endpoint
        .setAPIVersion(this.config.apiVersion)
        .setTokenToRoleMapper(this.mapTokenToRole)
        .addTo(app)
    );

    app.listen(config.port, config.onStart);
  }

  private registerRepositories() {
    container.registerInstance(
      DI.userRepository,
      this.connection.getCustomRepository(UserRepository)
    );
    container.registerInstance(
      DI.brandRepository,
      this.connection.getCustomRepository(BrandRepository)
    );
    container.registerInstance(
      DI.carRepository,
      this.connection.getCustomRepository(CarRepository)
    );
    container.registerInstance(
      DI.setupRepository,
      this.connection.getCustomRepository(SetupRepository)
    );
    container.registerInstance(
      DI.trackRepository,
      this.connection.getCustomRepository(TrackRepository)
    );
  }

  // TODO: move to AuthService
  private async mapTokenToRole(token: string) {
    const userRepository: UserRepository = container.resolve(DI.userRepository);
    const authService: AuthService = container.resolve(AuthService);

    if (!token) return undefined;

    const userId = await authService.decodeJWT(token);
    const user = await userRepository.findOne(userId);

    return user?.role;
  }
}
