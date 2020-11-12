import { Bloc } from '@src/modules/react-bloc';
import * as TestEvents from './test-event';
import * as TestStates from './test-state';

export class TestBloc extends Bloc<TestEvents.TestEvent, TestStates.TestState> {
  constructor() {
    super(new TestStates.Initial());
  }

  async *mapEventToState(event: TestEvents.TestEvent) {
    yield new TestStates.Alternative();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield new TestStates.Initial();
  }
}
