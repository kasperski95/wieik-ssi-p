import 'reflect-metadata';
import { App } from './app';
import { connectDatabase } from './config/connect-database';
import { Logger } from './utils/logger';

(async function main() {
  const port = 4000;
  const logger = new Logger().setLabel('main');

  const connection = await connectDatabase((options) => ({
    ...options,
    logger: new Logger().setLabel('typeorm'),
  }));

  try {
    new App(connection).main({
      port,
      onStart: () => {
        logger.info(`Server is running at port ${port}`);
      },
    });
  } catch (err) {
    logger.error('Fatal error', err);
  }
})();
