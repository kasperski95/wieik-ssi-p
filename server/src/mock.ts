import 'reflect-metadata';
import { createConnection, getConnectionOptions, getRepository } from 'typeorm';
import { Brand, BrandBuilder } from './models/Brand';
import { Model, ModelBuilder } from './models/Model';
import { Setup, SetupBuilder, SetupWeather } from './models/Setup';
import { Track, TrackBuilder } from './models/Track';
import { User, UserBuilder, UserRoles, UserStatus } from './models/User';
import { hash } from 'bcrypt';
import { Logger } from './utils/logger';

(async function main() {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    synchronize: true,
    logger: new Logger().setLabel('typeorm'),
  });

  const userRepository = getRepository(User);
  const brandRepository = getRepository(Brand);
  const modelRepository = getRepository(Model);
  const trackRepository = getRepository(Track);
  const setupRepository = getRepository(Setup);

  const users = {
    activeUser: new UserBuilder({
      email: 'activeUser@m.com',
      password: await hash('foobar', 10),
      role: UserRoles.user,
      status: UserStatus.active,
      username: 'activeUser',
    }).build(),
    blockedUser: new UserBuilder({
      email: 'blockedUser@m.com',
      password: await hash('foobar', 10),
      role: UserRoles.user,
      status: UserStatus.blocked,
      username: 'blockedUser',
    }).build(),
    admin: new UserBuilder({
      email: 'admin@m.com',
      password: await hash('foobar', 10),
      role: UserRoles.admin,
      status: UserStatus.active,
      username: 'admin',
    }).build(),
  };
  users.activeUser = await userRepository.save(users.activeUser);
  users.blockedUser = await userRepository.save(users.blockedUser);
  users.admin = await userRepository.save(users.admin);

  const brands = {
    audi: new BrandBuilder({ name: 'Audi' }).build(),
    porsche: new BrandBuilder({ name: 'Porsche' }).build(),
  };
  brands.audi = await brandRepository.save(brands.audi);
  brands.porsche = await brandRepository.save(brands.porsche);

  const models = {
    r8: new ModelBuilder({
      brand: brands.audi,
      name: 'R8',
      year: 2019,
    }).build(),
    _911: new ModelBuilder({
      brand: brands.audi,
      name: '911 GT3 R',
      year: 2019,
    }).build(),
  };
  models.r8 = await modelRepository.save(models.r8);
  models._911 = await modelRepository.save(models._911);

  const tracks = {
    nurburgring: new TrackBuilder({ name: 'Nurburgring' }).build(),
    misano: new TrackBuilder({ name: 'Misano' }).build(),
  };
  tracks.misano = await trackRepository.save(tracks.misano);
  tracks.nurburgring = await trackRepository.save(tracks.nurburgring);

  const setups = {
    setup1: new SetupBuilder({
      filename: 'a1b2c2.json',
      downloads: 0,
      time: 123.05,
      timeBase: 125,
      weather: SetupWeather.dry,
      model: models._911,
      track: tracks.nurburgring,
      user: users.activeUser,
    }).build(),
    setup2: new SetupBuilder({
      filename: 'a1b2c2.json',
      downloads: 0,
      time: 123.05,
      timeBase: 124,
      weather: SetupWeather.wet,
      model: models.r8,
      track: tracks.nurburgring,
      user: users.activeUser,
    }).build(),
  };
  setups.setup1 = await setupRepository.save(setups.setup1);
  setups.setup2 = await setupRepository.save(setups.setup2);
})();
