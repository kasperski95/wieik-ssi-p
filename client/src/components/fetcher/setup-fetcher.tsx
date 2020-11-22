import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { createUseStyle } from '@src/config/theme';
import { Brand } from '@src/models/brand';
import { Car } from '@src/models/car';
import { Setup } from '@src/models/setup';
import { Track } from '@src/models/track';
import { goFetch } from '@src/utils/fetch';
import { humanizeTime } from '@src/utils/humanize-time';
import Case from 'case';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../card';
import { Fetcher } from './index';

export function SetupFetcher(props: { trackId: string; carId: string }) {
  const { styles } = useStyle();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc(
    'setup',
    async (variables: { trackId: string; carId: string }) => {
      const track: Track = await goFetch(`track/${variables.trackId}`);
      const car: Car = await goFetch(`car/${variables.carId}`);
      const brand: Brand = await goFetch(`brand/${car.brandId}`);
      car.brand = brand;
      const setups: Setup[] = await goFetch(`setup`, {
        params: { c: variables.carId, t: variables.trackId },
      });

      for await (const setup of setups) {
        setup.user = await goFetch(`user/${setup.userId}`);
        setup.car = car;
        setup.track = track;
      }

      return setups;
    }
  );

  React.useEffect(() => {
    fetcherBloc.dispatch(
      new FetcherEvents.Fetch({ trackId: props.trackId, carId: props.carId })
    );
  }, [props.trackId, props.carId]);

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      builder={(result) => {
        return (
          <React.Fragment>
            {result.map((setup) => {
              const title = `${Case.kebab(setup.track!.name)}_${Case.kebab(
                setup.car!.brand!.name
              )}_${Case.kebab(setup.car!.name)}_${Case.kebab(
                setup.user!.username
              )}.setup`;
              return (
                <Card.Wrapper key={setup.id}>
                  <Card.Content title={title} actions={[{ label: 'Download' }]}>
                    <div>
                      Default Setup Time: {humanizeTime(setup.timeBase)}
                    </div>
                    <div>This Setup Time: {humanizeTime(setup.time)}</div>
                  </Card.Content>
                </Card.Wrapper>
              );
            })}
          </React.Fragment>
        );
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
