import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Builder } from '../abstractions/Builder';
import { Model } from './Model';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Model, (model) => model.brand)
  models: Model[];
}

export class BrandBuilder extends Builder<Brand> {
  private brand: Brand;
  constructor(data: { name: string }) {
    super();
    this.brand = new Brand();
    this.brand.name = data.name;
  }

  build(): Brand {
    return this.brand;
  }
}
