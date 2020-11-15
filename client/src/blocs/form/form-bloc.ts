import { Bloc } from '@src/modules/react-bloc';
import * as FormEvents from './form-event';
import * as FormStates from './form-state';

export class FormBloc<T extends { [key: string]: any }> extends Bloc<
  FormEvents.FormEvent,
  FormStates.FormState
> {
  private data: T;

  constructor(private initialData: T) {
    super(new FormStates.Editable(initialData));
    this.data = initialData;
  }

  public getValue(id: keyof T) {
    return this.data[id];
  }

  async *mapEventToState(event: FormEvents.FormEvent) {
    if (event instanceof FormEvents.Update) {
      this.data = { ...this.data, [event.id]: event.value };
      yield new FormStates.Editable(this.data);
    }
  }
}
