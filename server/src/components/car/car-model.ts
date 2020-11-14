import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
