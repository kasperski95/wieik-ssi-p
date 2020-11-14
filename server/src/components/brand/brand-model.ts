import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
