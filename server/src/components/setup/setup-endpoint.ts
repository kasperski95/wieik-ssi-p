import { StatusCodes } from 'http-status-codes';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { UserRoles } from '../user';
import { SetupRepository } from './setup-repository';

export class SetupEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private setupRepository: SetupRepository) {
    super(route);
  }

  main() {
    this.get(async (req, res) => {
      const carId = req.query.c;
      const trackId = req.query.t;
      if (!carId || !trackId) throw new APIException(StatusCodes.BAD_REQUEST);

      const results = await this.setupRepository.find({
        where: { carId, trackId },
      });

      res.send(results);
    });
  }
}
