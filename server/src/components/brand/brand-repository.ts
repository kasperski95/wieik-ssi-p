import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { BrandModel } from './brand-model';

@EntityRepository(BrandModel)
export class BrandRepository extends AbstractRepository<BrandModel> {
  createAndSave(data: { name: string; id?: string }) {
    const brand = new BrandModel();
    brand.id = data.id;
    brand.name = data.name;
    return this.save(brand);
  }
}
