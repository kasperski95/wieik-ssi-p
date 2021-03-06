import 'reflect-metadata';
import {
  createConnection,
  getConnectionOptions,
  getCustomRepository,
} from 'typeorm';
import { BrandRepository } from './components/brand';
import { CarRepository } from './components/car';
import { SetupRepository, SetupWeather } from './components/setup';
import { TrackRepository } from './components/track';
import { UserRepository, UserRoles, UserStatus } from './components/user';
import { Logger } from './utils/logger';

(async function main() {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    synchronize: true,
    logger: new Logger().setLabel('typeorm'),
  });

  const userRepository = getCustomRepository(UserRepository);
  const brandRepository = getCustomRepository(BrandRepository);
  const modelRepository = getCustomRepository(CarRepository);
  const trackRepository = getCustomRepository(TrackRepository);
  const setupRepository = getCustomRepository(SetupRepository);

  const users = {
    activeUser: await userRepository.createAndSave({
      email: 'activeUser@m.com',
      password: 'foobar',
      role: UserRoles.user,
      username: 'activeUser',
    }),
    blockedUser: await userRepository.createAndSave({
      email: 'blockedUser@m.com',
      password: 'foobar',
      role: UserRoles.user,
      username: 'blockedUser',
      status: UserStatus.blocked,
    }),
    admin: await userRepository.createAndSave({
      email: 'admin@m.com',
      password: 'foobar',
      role: UserRoles.admin,
      username: 'admin',
    }),
  };

  const brands = {
    audi: await brandRepository.createAndSave({
      name: 'Audi',
    }),
    porsche: await brandRepository.createAndSave({
      name: 'Porsche',
    }),
  };

  const models = {
    r8: await modelRepository.createAndSave({
      brand: brands.audi,
      name: 'R8',
      year: 2019,
    }),
    _911: await modelRepository.createAndSave({
      brand: brands.porsche,
      name: '991 GT3 R',
      year: 2019,
    }),
  };

  const tracks = {
    nurburgring: await trackRepository.createAndSave({ name: 'Nurburgring' }),
    misano: await trackRepository.createAndSave({ name: 'Misano' }),
    monza: await trackRepository.createAndSave({ name: 'Monza' }),
    imola: await trackRepository.createAndSave({ name: 'Imola' }),
    spa: await trackRepository.createAndSave({
      name: 'Circuit de Spa-Francorchamps',
    }),
  };

  const setups = {
    setup1: await setupRepository.createAndSave({
      filename: 'a1b2c3.setup',
      downloads: 0,
      time: 123.05,
      timeBase: 125,
      weather: SetupWeather.dry,
      modelId: models._911.id,
      trackId: tracks.spa.id,
      userId: users.activeUser.id,
    }),
    setup2: await setupRepository.createAndSave({
      filename: 'a1b2c3.setup',
      downloads: 0,
      time: 123.05,
      timeBase: 124,
      weather: SetupWeather.wet,
      modelId: models.r8.id,
      trackId: tracks.spa.id,
      userId: users.activeUser.id,
    }),
  };
})();
