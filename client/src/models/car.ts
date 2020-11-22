import { Brand } from './brand';
import { Setup } from './setup';

export interface Car {
  id: string;
  name: string;
  year: number;
  brand?: Brand;
  brandId: string;
  setups?: Setup[];
}
