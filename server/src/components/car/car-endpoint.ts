import { StatusCodes } from 'http-status-codes';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { UserRoles } from '../user';
import { CarRepository } from './car-repository';

export class CarEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private carRepository: CarRepository) {
    super(route);
  }

  main() {
    this.get(async (req, res) => {
      const brandId = req.query.b as string;
      if (!brandId) throw new APIException(StatusCodes.BAD_REQUEST);

      const result = await this.carRepository.find({
        where: {
          brandId: brandId,
        },
      });

      res.send(result);
    });

    this.get(
      async (req, res) => {
        const carId = req.params.id as string;
        if (!carId) throw new APIException(StatusCodes.BAD_REQUEST);

        const result = await this.carRepository.findOne(carId);

        if (!result) throw new APIException(StatusCodes.NOT_FOUND);
        res.send(result);
      },
      { routeSuffix: '/:id' }
    );
  }
}
