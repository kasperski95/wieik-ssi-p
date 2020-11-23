import { useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { Screen } from '@src/components/screen';
import { useCrud } from '@src/config/create-crud';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function SetupFormScreen() {
  const { styles } = useStyle();
  const { create } = useCrud();
  const formBloc = useFormBloc(
    'setup-form',
    {
      defaultTime: '',
      bestTime: '',
      file: undefined as undefined | File,
    },
    {
      onSubmit: async (data) => {
        // return create(endpoints.setup, formData);
        const formData = new FormData();
        formData.append('bestTime', data.bestTime);
        formData.append('file', data.file!);

        return create('setup', formData);
      },
      onSuccess: (result) => {
        console.log(result);
      },
    }
  );

  return (
    <Screen title='Upload Setup' showGoBack={true}>
      <Form.Wrapper formBloc={formBloc}>
        <Form.Builder
          formBloc={formBloc}
          builder={(formData, getInputProps) => {
            return (
              <React.Fragment>
                <FormField.Text
                  label='Default Setup Time'
                  {...getInputProps('defaultTime')}
                />
                <FormField.Text
                  label='Best Time'
                  {...getInputProps('bestTime')}
                />
                <FormField.File label='Setup' {...getInputProps('file')} />
              </React.Fragment>
            );
          }}
        />
      </Form.Wrapper>
    </Screen>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
