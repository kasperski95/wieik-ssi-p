import { AbstractEndpoint } from '../../abstractions/endpoint';
import { UserRoles } from '../user';
import { TrackRepository } from './track-repository';

export class TrackEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private trackRepository: TrackRepository) {
    super(route);
  }

  main() {
    this.get(async (req, res) => {
      const result = await this.trackRepository.find();

      res.send(result);
    });
  }
}
