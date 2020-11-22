import { Car } from './car';
import { Track } from './track';
import { User } from './user';

export interface Setup {
  id: string;
  filename: string;
  time: number;
  timeBase: number;
  downloads: number;
  weather: SetupWeather;
  user?: User;
  userId: string;
  track?: Track;
  trackId: string;
  car?: Car;
  carId: string;
}

export enum SetupWeather {
  dry = 'dry',
  wet = 'wet',
}
