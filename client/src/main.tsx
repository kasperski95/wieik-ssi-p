import React from 'react';
import { ThemeEvents, useThemeBloc } from './blocs/theme';
import { UserEvents, UserStates, useUserBloc } from './blocs/user';
import { SplashScreen } from './components/splash-screen';
import { ThemeChanger } from './components/theme-changer';
import { createCrud } from './config/create-crud';
import { ThemeProvider } from './config/theme';
import { Bloc, BlocBuilder } from './modules/react-bloc';
import { Router } from './router';
import { BannedScreen } from './screens/banned/banned-screen';

export function App() {
  Bloc.logger = console;
  const userBloc = useUserBloc();
  const themeBloc = useThemeBloc();

  userBloc.dispatch(new UserEvents.Init());
  themeBloc.dispatch(new ThemeEvents.Init());

  return (
    <ThemeProvider>
      <ThemeChanger>
        <BlocBuilder
          bloc={userBloc}
          builder={(state) => {
            if (state instanceof UserStates.Identifying)
              return <SplashScreen />;
            else if (state instanceof UserStates.Authenticated) {
              const { CrudProvider } = createCrud(state.jwt);
              return (
                <CrudProvider>
                  <Router />
                </CrudProvider>
              );
            } else if (state instanceof UserStates.Banned) {
              return <BannedScreen />;
            }
            const { CrudProvider } = createCrud();
            return (
              <CrudProvider>
                <Router />
              </CrudProvider>
            );
          }}
        />
      </ThemeChanger>
    </ThemeProvider>
  );
}
