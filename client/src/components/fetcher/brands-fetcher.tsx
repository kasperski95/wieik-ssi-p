import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { createUseStyle } from '@src/config/theme';
import { Track } from '@src/models/track';
import { goFetch } from '@src/utils/fetch';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PhotoCard } from '../photo-card';
import { Fetcher } from './index';

export function BrandsFetcher() {
  const { styles } = useStyle();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc('brand', async () => {
    return (await goFetch('brand')) as Track[];
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch());
  }, []);

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      builder={(result) => {
        return (
          <div style={styles.wrapper}>
            {result.map((brand) => {
              let positionY = undefined as undefined | number;

              return (
                <PhotoCard
                  style={styles.card}
                  key={brand.id}
                  onClick={() => {
                    console.log(history);
                    history.push(
                      history.location.pathname +
                        history.location.search +
                        `&b=${brand.id}`
                    );
                  }}
                  imageFileName={brand.name}
                  positionY={positionY}
                  format='png'
                />
              );
            })}
          </div>
        );
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: dimensions.gutterSmall,
  },
  card: {},
}));
