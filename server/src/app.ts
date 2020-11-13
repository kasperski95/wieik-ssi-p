import express from 'express';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { AuthEndpoint } from './components/auth';
import { UserRepository } from './components/user/user-repository';
import { RepositoryDITokens } from './types/enums';

export class App {
  constructor(private connection: Connection) {}

  main(config: { port: number; onStart: () => void }) {
    this.registerRepositories();
    const app = express();

    [
      new AuthEndpoint(
        '/auth',
        container.resolve(RepositoryDITokens.userRepository)
      ),
    ].forEach((endpoint) => endpoint.addTo(app));

    app.listen(config.port, config.onStart);
  }

  private registerRepositories() {
    container.registerInstance(
      RepositoryDITokens.userRepository,
      this.connection.getCustomRepository(UserRepository)
    );
  }
}
