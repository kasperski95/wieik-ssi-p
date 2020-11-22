import { BrandsFetcher } from '@src/components/fetcher/brands-fetcher';
import { TracksFetcher } from '@src/components/fetcher/tracks-fetcher';
import { Screen } from '@src/components/screen';
import { Stepper } from '@src/components/stepper';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function SetupSearcherScreen(props: {
  trackId?: string | null;
  brandId?: string | null;
}) {
  const { styles } = useStyle();
  let activeIndex = 0;
  if (props.trackId) activeIndex = 1;
  if (props.trackId && props.brandId) activeIndex = 2;

  return (
    <Screen
      title='Setup Searcher'
      actions={[{ label: 'Register' }, { label: 'Log In' }]}
    >
      <Stepper
        style={styles.stepper}
        activeIndex={activeIndex}
        steps={[
          { label: 'Choose Track', body: <TracksFetcher /> },
          { label: 'Choose Brand', body: <BrandsFetcher /> },
          { label: 'Choose Car' },
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
