import { useFormBloc } from '@src/blocs/form';
import { UserEvents, useUserBloc } from '@src/blocs/user';
import { Form, FormField } from '@src/components/form';
import { Screen } from '@src/components/screen';
import { useBackend } from '@src/config/create-backend-utils';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function LoginScreen() {
  const { styles } = useStyle();
  const history = useHistory();
  const userBloc = useUserBloc();
  const { send } = useBackend();
  const formBloc = useFormBloc(
    'login',
    {
      email: 'activeUser@m.com',
      password: 'foobar',
    },
    {
      onSubmit: async (data) => {
        return send('auth', data);
      },
      onSuccess: (jwt: string) => {
        userBloc.dispatch(new UserEvents.Change(jwt));
        history.push('/');
      },
    }
  );

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
