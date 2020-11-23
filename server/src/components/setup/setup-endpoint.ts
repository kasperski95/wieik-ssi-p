import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { v4 as uuid } from 'uuid';
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

    this.post(
      async (req, res) => {
        console.log(req.body);
        console.log(req.files);

        const fileName = uuid();
        fs.writeFileSync(
          path.join(__dirname, '../../../public/setups', fileName),
          req.files.file.data
        );

        res.status(200).send();
      }
      // { authorize: [UserRoles.user, UserRoles.admin] }
    );
  }
}
