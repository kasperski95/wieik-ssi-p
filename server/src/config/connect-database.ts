import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export async function connectDatabase(
  middleware?: (options: ConnectionOptions) => ConnectionOptions
) {
  const connectionOptions = await getConnectionOptions();
  if (middleware) {
    return createConnection(middleware(connectionOptions));
  } else {
    return createConnection(connectionOptions);
  }
}
