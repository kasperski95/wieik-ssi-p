import { Bloc } from '@src/modules/react-bloc';
import * as FetcherEvents from './fetcher-event';
import * as FetcherStates from './fetcher-state';

export class FetcherBloc<T, R> extends Bloc<
  FetcherEvents.FetcherEvent,
  FetcherStates.FetcherState
> {
  constructor(private fetch: (variables: T) => Promise<R>) {
    super(new FetcherStates.Loading());
  }

  async *mapEventToState(event: FetcherEvents.FetcherEvent) {
    if (event instanceof FetcherEvents.Fetch) {
      try {
        yield new FetcherStates.Loading();
        const result = await this.fetch(event.variables);
        yield new FetcherStates.Success(result);
      } catch (err) {
        yield new FetcherStates.Failure(err?.message);
        console.error(err);
      }
    }
  }
}
