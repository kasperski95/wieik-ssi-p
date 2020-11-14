import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { TrackModel } from './track-model';

@EntityRepository(TrackModel)
export class TrackRepository extends AbstractRepository<TrackModel> {
  createAndSave(data: { name: string }) {
    const track = new TrackModel();
    track.name = data.name;
    return this.repository.save(track);
  }
}
