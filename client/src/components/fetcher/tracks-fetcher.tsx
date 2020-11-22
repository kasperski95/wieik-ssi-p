import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { createUseStyle } from '@src/config/theme';
import { Track } from '@src/models/track';
import { goFetch } from '@src/utils/fetch';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PhotoCard } from '../photo-card';
import { Fetcher } from './index';

export function TracksFetcher() {
  const { styles } = useStyle();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc('track', async () => {
    return (await goFetch('track')) as Track[];
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch());
  }, []);

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      builder={(result) => {
        return (
          <React.Fragment>
            {result.map((track) => {
              let positionY = undefined as undefined | number;
              switch (track.name) {
                case 'Nurburgring':
                  positionY = 0.75;
                  break;
              }

              return (
                <PhotoCard
                  key={track.id}
                  onClick={() => history.push(`/?t=${track.id}`)}
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

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
