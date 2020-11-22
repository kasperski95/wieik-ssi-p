import { Setup } from './setup';

export interface Track {
  id: string;
  name: string;
  setups?: Setup[];
}
