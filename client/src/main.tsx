import React from 'react';
import { UserEvents, UserStates, useUserBloc } from './blocs/user';
import { SplashScreen } from './components/splash-screen';
import { createBackendUtils } from './config/create-backend-utils';
import { theme, ThemeProvider } from './config/theme';
import { Bloc, BlocBuilder } from './modules/react-bloc';
import { Router } from './router';

export function App() {
  Bloc.logger = console;
  document.body.style.backgroundColor = theme.active.main;
  document.body.style.color = theme.active.contrast.main;

  const userBloc = useUserBloc();
  userBloc.dispatch(new UserEvents.Init());

  return (
    <ThemeProvider>
      <BlocBuilder
        bloc={userBloc}
        builder={(state) => {
          if (state instanceof UserStates.Identifying) return <SplashScreen />;
          else if (state instanceof UserStates.Authenticated) {
            const { BackendProvider } = createBackendUtils(state.jwt);
            return (
              <BackendProvider>
                <Router />
              </BackendProvider>
            );
          }
          const { BackendProvider } = createBackendUtils();
          return (
            <BackendProvider>
              <Router />
            </BackendProvider>
          );
        }}
      />
    </ThemeProvider>
  );
}
