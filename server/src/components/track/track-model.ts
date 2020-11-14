import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
