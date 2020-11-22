import { Car } from './car';

export interface Brand {
  id: string;
  name: string;
  models?: Car[];
}
