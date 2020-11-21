import { PhotoCard } from '@src/components/photo-card';
import { Screen } from '@src/components/screen';
import { Stepper } from '@src/components/stepper';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function SetupSearcherScreen(props: {
  trackId?: string | null;
  brandId?: string | null;
}) {
  const { styles } = useStyle();

  console.log(props);

  return (
    <Screen
      title='Setup Searcher'
      actions={[{ label: 'Rejestracja' }, { label: 'Logowanie' }]}
    >
      <Stepper
        style={styles.stepper}
        activeIndex={0}
        steps={['Track', 'Brand', 'Car']}
      />

      <PhotoCard title='Nurburgring' positionY={0.75} />
      <PhotoCard title='Misano' />
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
