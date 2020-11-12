import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Builder } from '../../abstractions/Builder';
import { CarModel } from '../car/car-model';

@Entity('brand')
export class BrandModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => CarModel, (model) => model.brand)
  models: CarModel[];
}

export class BrandBuilder extends Builder<BrandModel> {
  private brand: BrandModel;
  constructor(data: { name: string }) {
    super();
    this.brand = new BrandModel();
    this.brand.name = data.name;
  }

  build(): BrandModel {
    return this.brand;
  }
}
