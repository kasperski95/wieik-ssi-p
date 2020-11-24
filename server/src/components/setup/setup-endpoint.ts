import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { UserRoles } from '../user';
import { SetupRepository } from './setup-repository';
import { SetupWeather } from './setup-types';

export class SetupEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private setupRepository: SetupRepository) {
    super(route);
  }

  main() {
    this.get(async (req, res) => {
      const carId = req.query.c;
      const trackId = req.query.t;
      const userId = req.query.u;
      const where = userId ? { userId } : { trackId, carId };

      const results = await this.setupRepository.find({
        where,
      });

      res.send(results);
    });

    this.post(
      async (req, res) => {
        const userId = res.locals.userId;
        if (!userId) throw new APIException(StatusCodes.UNAUTHORIZED);

        if (
          !req.files?.setup ||
          !req.body.time ||
          !req.body.defaultTime ||
          !req.body.trackId ||
          !req.body.carId
        )
          throw new APIException(StatusCodes.BAD_REQUEST);

        const filename = uuid();
        fs.writeFileSync(
          path.join(__dirname, '../../../public/setups', filename),
          req.files.setup.data
        );

        const setup = await this.setupRepository.createAndSave({
          weather: SetupWeather.dry,
          filename,
          time: req.body.time,
          timeBase: req.body.defaultTime,
          downloads: 0,
          userId: userId,
          trackId: req.body.trackId,
          modelId: req.body.carId,
        });

        res.send(setup);
      },
      { authorize: [UserRoles.user, UserRoles.admin] }
    );

    this.delete(
      async (req, res) => {
        const id = req.params.id as string | undefined;

        if (!id) throw new APIException(StatusCodes.BAD_REQUEST);
        const setup = await this.setupRepository.findOne(id);
        if (res.locals.userId != setup.userId)
          throw new APIException(StatusCodes.UNAUTHORIZED);

        await this.setupRepository.delete(id);
        res.sendStatus(StatusCodes.ACCEPTED);
        try {
          fs.rmSync(
            path.join(__dirname, '../../../public/setups', setup.filename)
          );
        } catch (err) {}
      },
      { authorize: [UserRoles.user, UserRoles.admin], routeSuffix: '/:id' }
    );
  }
}
