import { StatusCodes } from 'http-status-codes';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { BrandRepository } from './brand-repository';

export class BrandEndpoint extends AbstractEndpoint {
  constructor(route: string, private brandRepository: BrandRepository) {
    super(route);
  }

  main() {
    this.get(async (req, res) => {
      const results = await this.brandRepository.find();
      if (results.length === 0) throw new APIException(StatusCodes.NOT_FOUND);
      res.send(results);
    });

    this.get(
      async (req, res) => {
        if (!req.params.id) throw new APIException(StatusCodes.BAD_REQUEST);
        const result = await this.brandRepository.findOne(req.params.id);
        if (!result) throw new APIException(StatusCodes.NOT_FOUND);
        res.send(result);
      },
      { routeSuffix: '/:id' }
    );

    this.post(async (req, res) => {
      this.brandRepository.createAndSave(req.body);
    });
  }
}
