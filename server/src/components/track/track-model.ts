import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Builder } from '../../abstractions/Builder';
import { SetupModel } from '../setup/setup-model';

@Entity('track')
export class TrackModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => SetupModel, (setup) => setup.track)
  setups: SetupModel[];
}

export class TrackBuilder extends Builder<TrackModel> {
  private track: TrackModel;
  constructor(data: { name: string }) {
    super();
    this.track = new TrackModel();
    this.track.name = data.name;
  }

  build(): TrackModel {
    return this.track;
  }
}
