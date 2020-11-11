import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Builder } from '../abstractions/Builder';
import { Brand } from './Brand';
import { Setup } from './Setup';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne((type) => Brand, (brand) => brand.models, { eager: true })
  brand: Brand;

  @OneToMany((type) => Setup, (setup) => setup.model)
  setups: Setup[];
}

export class ModelBuilder extends Builder<Model> {
  private model: Model;
  constructor(data: { name: string; year: number; brand: Brand }) {
    super();
    this.model = new Model();
    this.model.name = data.name;
    this.model.year = data.year;
    this.model.brand = data.brand;
  }

  build(): Model {
    return this.model;
  }
}
