import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
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

  @ManyToOne((type) => UserModel, (user) => user.setups)
  user: UserModel;

  @RelationId((self: SetupModel) => self.user)
  @Column()
  userId: string;

  @ManyToOne((type) => TrackModel, (track) => track.setups, { eager: true })
  track: TrackModel;

  @RelationId((self: SetupModel) => self.track)
  @Column()
  trackId: string;

  @ManyToOne((type) => CarModel, (model) => model.setups, { eager: true })
  car: CarModel;

  @RelationId((self: SetupModel) => self.car)
  @Column()
  carId: string;
}
