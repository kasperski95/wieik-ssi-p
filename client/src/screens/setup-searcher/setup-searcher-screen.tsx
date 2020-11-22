import { BrandsFetcher } from '@src/components/fetcher/brands-fetcher';
import { CarsFetcher } from '@src/components/fetcher/car-fetcher';
import { SetupFetcher } from '@src/components/fetcher/setup-fetcher';
import { TracksFetcher } from '@src/components/fetcher/tracks-fetcher';
import { Screen } from '@src/components/screen';
import { Stepper } from '@src/components/stepper';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function SetupSearcherScreen(props: {
  trackId?: string | null;
  brandId?: string | null;
  carId?: string | null;
}) {
  const { styles } = useStyle();
  const history = useHistory();

  let activeIndex = 0;
  if (props.trackId) activeIndex = 1;
  if (props.trackId && props.brandId) activeIndex = 2;
  if (props.trackId && props.carId) activeIndex = 3;

  return (
    <Screen
      title='Setup Searcher'
      actions={[{ label: 'Register' }, { label: 'Log In' }]}
    >
      <Stepper
        style={styles.stepper}
        activeIndex={activeIndex}
        steps={[
          {
            label: 'Choose Track',
            renderer: () => <TracksFetcher />,
            onClick: () => {
              for (let i = 0; i < activeIndex; ++i) {
                history.goBack();
              }
            },
          },
          {
            label: 'Choose Brand',
            renderer: () => <BrandsFetcher />,
            onClick: () => {
              for (let i = 1; i < activeIndex; ++i) {
                history.goBack();
              }
            },
          },
          {
            label: 'Choose Car',
            onClick: () => {
              for (let i = 2; i < activeIndex; ++i) {
                history.goBack();
              }
            },
            renderer: () => {
              return <CarsFetcher brandId={props.brandId!} />;
            },
          },
          {
            label: 'Choose Setup',
            renderer: () => {
              return (
                <SetupFetcher trackId={props.trackId!} carId={props.carId!} />
              );
            },
          },
        ]}
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
