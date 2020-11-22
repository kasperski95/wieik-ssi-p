import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { Fetcher } from '@src/components/fetcher';
import { PhotoCard } from '@src/components/photo-card';
import { Screen } from '@src/components/screen';
import { Stepper } from '@src/components/stepper';
import { createUseStyle } from '@src/config/theme';
import { Track } from '@src/models/track';
import { goFetch } from '@src/utils/fetch';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function SetupSearcherScreen(props: {
  trackId?: string | null;
  brandId?: string | null;
}) {
  const { styles } = useStyle();
  const history = useHistory();

  const fetcherBloc = useFetcherBloc('track', async () => {
    return (await goFetch('track')) as Track[];
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch());
  }, []);

  return (
    <Screen
      title='Setup Searcher'
      actions={[{ label: 'Register' }, { label: 'Log In' }]}
    >
      <Stepper
        style={styles.stepper}
        activeIndex={0}
        steps={['Choose Track', 'Choose Brand', 'Choose Car']}
      />

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
                    positionY={positionY}
                  />
                );
              })}
            </React.Fragment>
          );
        }}
      />
    </Screen>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  stepper: {
    marginBottom: dimensions.gutterMedium,
  },
}));

/* <Form.Wrapper formBloc={formBloc}>
<Form.Builder
  formBloc={formBloc}
  builder={(formData, createProps) => {
    return (
      <React.Fragment>
        <FormField.Text label='test' {...createProps('foo')} />
        <FormField.Text label='test' {...createProps('foo')} />
      </React.Fragment>
    );
  }}
/>
</Form.Wrapper> */
