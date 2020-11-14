import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { BrandModel } from './brand-model';

@EntityRepository(BrandModel)
export class BrandRepository extends AbstractRepository<BrandModel> {
  createAndSave(data: { name: string }) {
    const brand = new BrandModel();
    brand.name = data.name;
    return this.save(brand);
  }
}
