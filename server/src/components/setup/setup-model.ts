import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Builder } from '../../abstractions/Builder';
import { CarModel } from '../car/car-model';
import { TrackModel } from '../track/track-model';
import { UserModel } from '../user/user-model';

export enum SetupWeather {
  dry = 'dry',
  wet = 'wet',
}

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

export class SetupBuilder extends Builder<SetupModel> {
  private setup: SetupModel;
  constructor(data: {
    filename: string;
    time: number;
    timeBase: number;
    downloads: number;
    weather: SetupWeather;
    user: UserModel;
    track: TrackModel;
    model: CarModel;
  }) {
    super();
    this.setup = new SetupModel();
    this.setup.filename = data.filename;
    this.setup.time = data.time;
    this.setup.timeBase = data.timeBase;
    this.setup.downloads = data.downloads;
    this.setup.weather = data.weather;
    this.setup.user = data.user;
    this.setup.track = data.track;
    this.setup.car = data.model;
  }

  build(): SetupModel {
    return this.setup;
  }
}
