import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { useCrud } from '@src/config/create-crud';
import { endpoints, routes } from '@src/config/routes';
import { Track } from '@src/models/track';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PhotoCard } from '../photo-card';
import { Fetcher } from './index';

export function TracksFetcher() {
  const { read } = useCrud();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc('track', async () => {
    return (await read(endpoints.track)) as Track[];
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch());
  }, [fetcherBloc]);

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      builder={(result) => {
        return (
          <React.Fragment>
            {result
              .sort((lhs, rhs) => {
                return lhs.name.localeCompare(rhs.name);
              })
              .map((track) => {
                let positionY = undefined as undefined | number;
                switch (track.name) {
                  case 'Monza':
                    positionY = 0.45;
                    break;
                  case 'Nurburgring':
                    positionY = 0.75;
                    break;
                }

                return (
                  <PhotoCard
                    key={track.id}
                    onClick={() => history.push(`${routes.home}?t=${track.id}`)}
                    title={track.name}
                    imageFileName={track.name}
                    positionY={positionY}
                  />
                );
              })}
          </React.Fragment>
        );
      }}
    />
  );
}
