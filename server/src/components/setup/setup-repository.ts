import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
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
    userId: string;
    trackId: string;
    modelId: string;
  }): Promise<SetupModel> {
    const setup = new SetupModel();
    setup.filename = data.filename;
    setup.time = data.time;
    setup.timeBase = data.timeBase;
    setup.downloads = data.downloads;
    setup.weather = data.weather;
    setup.userId = data.userId;
    setup.trackId = data.trackId;
    setup.carId = data.modelId;
    return this.save(setup);
  }
}
