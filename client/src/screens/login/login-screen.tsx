import { useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { Screen } from '@src/components/screen';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function LoginScreen() {
  const { styles } = useStyle();

  const formBloc = useFormBloc('login', {
    email: '',
    password: '',
  });

  return (
    <Screen style={styles.container} title='Log In' showGoBack={true}>
      <Form.Wrapper style={styles.form} formBloc={formBloc}>
        <Form.Builder
          formBloc={formBloc}
          builder={(data, createFormFieldProps) => {
            return (
              <React.Fragment>
                <FormField.Text
                  {...createFormFieldProps('email')}
                  label='E-mail'
                />
                <FormField.Text
                  {...createFormFieldProps('password')}
                  label='Password'
                  obscure={true}
                />
              </React.Fragment>
            );
          }}
        />
      </Form.Wrapper>
    </Screen>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  form: {
    maxWidth: 500,
  },
}));
