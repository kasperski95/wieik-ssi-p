import { UserEvents, useUserBloc } from '@src/blocs/user';
import { ErrorBox } from '@src/components/error-box';
import { Screen } from '@src/components/screen';
import React from 'react';

export function BannedScreen() {
  const userBloc = useUserBloc();
  return (
    <Screen
      title="You've been banned"
      actions={[
        {
          label: `Log Out (${userBloc.user?.username})`,
          onClick: () => {
            userBloc.dispatch(new UserEvents.Logout());
          },
        },
      ]}
    >
      <ErrorBox message='Your account has been deactivated by administrator.' />
    </Screen>
  );
}
