import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useUserBloc } from './blocs/user';
import {
  isAuthorized as isUserAuthorized,
  Privileges,
} from './config/authorization';
import { LoginScreen } from './screens/login/login-screen';
import { SetupSearcherScreen } from './screens/setup-searcher/setup-searcher-screen';

export function Router() {
  const userBloc = useUserBloc();
  const isAuthorized = (privilege: Privileges) =>
    isUserAuthorized(userBloc.user, privilege);

  return (
    <BrowserRouter>
      <Switch>
        {isAuthorized(Privileges.seeLogin) && (
          <Route
            exact
            path='/login'
            render={() => {
              return <LoginScreen />;
            }}
          />
        )}
        <Route
          path='/'
          render={({ location }) => {
            const queryVariables = new URLSearchParams(location.search);
            return (
              <SetupSearcherScreen
                trackId={queryVariables.get('t')}
                brandId={queryVariables.get('b')}
                carId={queryVariables.get('c')}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
