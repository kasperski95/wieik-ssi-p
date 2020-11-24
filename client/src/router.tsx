import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useUserBloc } from './blocs/user';
import {
  isAuthorized as isUserAuthorized,
  Privileges,
} from './config/authorization';
import { routes } from './config/routes';
import { LoginScreen } from './screens/login/login-screen';
import { RegistrationScreen } from './screens/registration/registration-screen';
import { SetupFormScreen } from './screens/setup-form/setup-form-screen';
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
            path={routes.login}
            render={() => {
              return <LoginScreen />;
            }}
          />
        )}
        {isAuthorized(Privileges.seeRegistration) && (
          <Route
            exact
            path={routes.register}
            render={() => {
              return <RegistrationScreen />;
            }}
          />
        )}
        {isAuthorized(Privileges.uploadSetup) && (
          <Route
            exact
            path={routes.uploadSetup}
            render={({ location, history }) => {
              const queryVariables = new URLSearchParams(location.search);
              const trackId = queryVariables.get('t');
              const carId = queryVariables.get('c');

              if (!trackId || !carId) {
                history.push(routes.home);
                return null;
              }

              return <SetupFormScreen trackId={trackId!} carId={carId!} />;
            }}
          />
        )}
        <Route
          path={routes.home}
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
