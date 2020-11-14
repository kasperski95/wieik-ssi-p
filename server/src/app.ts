import express from 'express';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { AuthEndpoint } from './components/auth';
import { BrandRepository } from './components/brand';
import { BrandEndpoint } from './components/brand/brand-endpoint';
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

    [
      new AuthEndpoint('app', container.resolve(DI.userRepository)),
      new BrandEndpoint('brand', container.resolve(DI.brandRepository)),
    ].forEach((endpoint) =>
      endpoint.setAPIVersion(this.config.apiVersion).addTo(app)
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
  }
}
