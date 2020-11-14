import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarModel } from '../car/car-model';
import { TrackModel } from '../track';
import { UserModel } from '../user';
import { SetupWeather } from './setup-types';

@Entity('setup')
export class SetupModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  filename: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  time: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  timeBase: number;

  @Column()
  downloads: number;

  @Column('text')
  weather: SetupWeather;

  @ManyToOne((type) => UserModel, (user) => user.setups, { eager: true })
  user: UserModel;

  @ManyToOne((type) => TrackModel, (track) => track.setups, { eager: true })
  track: TrackModel;

  @ManyToOne((type) => CarModel, (model) => model.setups, { eager: true })
  car: CarModel;
}
