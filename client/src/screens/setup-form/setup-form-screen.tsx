import { useFormBloc } from '@src/blocs/form';
import { UserEvents, useUserBloc } from '@src/blocs/user';
import { Form, FormField } from '@src/components/form';
import { Screen } from '@src/components/screen';
import { isAuthorized, Privileges } from '@src/config/authorization';
import { useCrud } from '@src/config/create-crud';
import { routes } from '@src/config/routes';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function SetupFormScreen(props: { trackId: string; carId: string }) {
  const { create } = useCrud();
  const history = useHistory();
  const userBloc = useUserBloc();
  const formBloc = useFormBloc(
    'setup-form',
    {
      time: '',
      defaultTime: '',
      setup: undefined as undefined | File,
    },
    {
      onSubmit: async (data) => {
        const formData = new FormData();
        formData.append('trackId', props.trackId);
        formData.append('carId', props.carId);
        formData.append('time', data.time);
        formData.append('defaultTime', data.defaultTime);
        formData.append('setup', data.setup!);
        return create('setup', formData);
      },
      onSuccess: (result) => {
        history.push(`${routes.home}?t=${props.trackId}&c=${props.carId}`);
      },
    }
  );

  return (
    <Screen
      title='Upload Setup'
      showBackArrow={true}
      onGoBack={() => {
        if (history.length > 0) history.goBack();
        else history.push(routes.home);
      }}
      actions={[
        isAuthorized(userBloc.user, Privileges.seeMySetups)
          ? {
              label: 'My Setups',
              onClick: () => {
                history.push(routes.mySetups);
              },
            }
          : undefined,
        !!userBloc.user
          ? {
              label: `Log Out (${userBloc.user.username})`,
              onClick: () => {
                userBloc.dispatch(new UserEvents.Logout());
              },
            }
          : undefined,
      ]}
    >
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
                  label='Time on this setup'
                  {...getInputProps('time')}
                />
                <FormField.File label='Setup' {...getInputProps('setup')} />
              </React.Fragment>
            );
          }}
        />
      </Form.Wrapper>
    </Screen>
  );
}
