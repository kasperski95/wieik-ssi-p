import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { useBackend } from '@src/config/create-backend-utils';
import { createUseStyle } from '@src/config/theme';
import { Brand } from '@src/models/brand';
import { Car } from '@src/models/car';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PhotoCard } from '../photo-card';
import { Fetcher } from './index';

export function CarsFetcher(props: { brandId: string }) {
  const { styles } = useStyle();
  const { fetch } = useBackend();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc('car', async (brandId: string) => {
    const brand: Brand = await fetch(`brand/${brandId}`);
    const cars: Car[] = await fetch('car', { params: { b: brandId } });
    cars.forEach((car) => {
      car.brand = brand;
    });
    return cars;
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch(props.brandId));
  }, [props.brandId]);

  return (
    <Fetcher
      fetcherBloc={fetcherBloc}
      builder={(result) => {
        return (
          <div>
            {result.map((car) => {
              let positionY = undefined as undefined | number;

              return (
                <PhotoCard
                  style={styles.card}
                  key={car.id}
                  title={car.name}
                  imageFileName={car.brand!.name + ' ' + car.name}
                  onClick={() => {
                    history.push(
                      history.location.pathname +
                        history.location.search +
                        `&c=${car.id}`
                    );
                  }}
                  positionY={positionY}
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
  card: {
    height: 240,
  },
}));
