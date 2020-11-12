import { createConnection, getConnectionOptions } from 'typeorm';
import { Logger } from '../utils/logger';

export async function connectDatabase() {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    logger: new Logger().setLabel('typeorm'),
  });
}
