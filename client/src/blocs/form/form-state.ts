import { BlocState } from '@src/modules/react-bloc';

export abstract class FormState extends BlocState {}

export class Editable<T> extends FormState {
  constructor(public data: T) {
    super();
  }
}
