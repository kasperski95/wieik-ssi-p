import { StatusCodes } from 'http-status-codes';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
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

    this.get(
      async (req, res) => {
        const id = req.params.id as string;
        if (!id) throw new APIException(StatusCodes.BAD_REQUEST);

        const track = await this.trackRepository.findOne(id);

        if (!track) throw new APIException(StatusCodes.NOT_FOUND);
        res.send(track);
      },
      { routeSuffix: '/:id' }
    );
  }
}
