import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { CarModel } from '../car';
import { TrackModel } from '../track';
import { UserModel } from '../user';
import { SetupModel } from './setup-model';
import { SetupWeather } from './setup-types';

@EntityRepository(SetupModel)
export class SetupRepository extends AbstractRepository<SetupModel> {
  createAndSave(data: {
    filename: string;
    time: number;
    timeBase: number;
    downloads: number;
    weather: SetupWeather;
    user: UserModel;
    track: TrackModel;
    model: CarModel;
  }): Promise<SetupModel> {
    const setup = new SetupModel();
    setup.filename = data.filename;
    setup.time = data.time;
    setup.timeBase = data.timeBase;
    setup.downloads = data.downloads;
    setup.weather = data.weather;
    setup.user = data.user;
    setup.track = data.track;
    setup.car = data.model;
    return this.save(setup);
  }
}
