import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Builder } from '../abstractions/Builder';
import { Setup } from './Setup';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Setup, (setup) => setup.track)
  setups: Setup[];
}

export class TrackBuilder extends Builder<Track> {
  private track: Track;
  constructor(data: { name: string }) {
    super();
    this.track = new Track();
    this.track.name = data.name;
  }

  build(): Track {
    return this.track;
  }
}
