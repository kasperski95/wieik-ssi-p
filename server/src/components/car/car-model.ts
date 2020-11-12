import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Builder } from '../../abstractions/Builder';
import { BrandModel } from '../brand/brand-model';
import { SetupModel } from '../setup/setup-model';

@Entity('car')
export class CarModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne((type) => BrandModel, (brand) => brand.models, { eager: true })
  brand: BrandModel;

  @OneToMany((type) => SetupModel, (setup) => setup.car)
  setups: SetupModel[];
}

export class ModelBuilder extends Builder<CarModel> {
  private car: CarModel;
  constructor(data: { name: string; year: number; brand: BrandModel }) {
    super();
    this.car = new CarModel();
    this.car.name = data.name;
    this.car.year = data.year;
    this.car.brand = data.brand;
  }

  build(): CarModel {
    return this.car;
  }
}
