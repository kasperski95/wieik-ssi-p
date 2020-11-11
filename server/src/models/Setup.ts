import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Builder } from '../abstractions/Builder';
import { Model } from './Model';
import { Track } from './Track';
import { User } from './User';

export enum SetupWeather {
  dry = 'dry',
  wet = 'wet',
}

@Entity()
export class Setup {
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

  @ManyToOne((type) => User, (user) => user.setups, { eager: true })
  user: User;

  @ManyToOne((type) => Track, (track) => track.setups, { eager: true })
  track: Track;

  @ManyToOne((type) => Model, (model) => model.setups, { eager: true })
  model: Model;
}

export class SetupBuilder extends Builder<Setup> {
  private setup: Setup;
  constructor(data: {
    filename: string;
    time: number;
    timeBase: number;
    downloads: number;
    weather: SetupWeather;
    user: User;
    track: Track;
    model: Model;
  }) {
    super();
    this.setup = new Setup();
    this.setup.filename = data.filename;
    this.setup.time = data.time;
    this.setup.timeBase = data.timeBase;
    this.setup.downloads = data.downloads;
    this.setup.weather = data.weather;
    this.setup.user = data.user;
    this.setup.track = data.track;
    this.setup.model = data.model;
  }

  build(): Setup {
    return this.setup;
  }
}
