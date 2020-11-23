import { useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { Screen } from '@src/components/screen';
import { useCrud } from '@src/config/create-crud';
import { endpoints, routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function RegistrationScreen() {
  const { styles } = useStyle();
  const history = useHistory();
  const { create } = useCrud();
  const formBloc = useFormBloc(
    'register',
    {
      username: '',
      email: '',
      password: '',
    },
    {
      onSubmit: async (data) => {
        return create(endpoints.user, data);
      },
      onSuccess: () => {
        history.push(routes.login);
      },
    }
  );

  return (
    <Screen style={styles.container} title='Register' showGoBack={true}>
      <Form.Wrapper style={styles.form} formBloc={formBloc}>
        <Form.Builder
          formBloc={formBloc}
          builder={(_, createFormFieldProps) => {
            return (
              <React.Fragment>
                <FormField.Text
                  {...createFormFieldProps('username')}
                  label='Username'
                />
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
