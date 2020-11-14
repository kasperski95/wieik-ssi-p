import { EntityRepository } from 'typeorm';
import { AbstractRepository } from '../../abstractions/repository';
import { BrandModel } from '../brand';
import { CarModel } from './car-model';

@EntityRepository(CarModel)
export class CarRepository extends AbstractRepository<CarModel> {
  createAndSave(data: {
    name: string;
    year: number;
    brand: BrandModel;
  }): Promise<CarModel> {
    const car = new CarModel();
    car.name = data.name;
    car.year = data.year;
    car.brand = data.brand;
    return this.repository.save(car);
  }
}
