import { createUseStyle, ThemeProvider } from '@src/config/theme';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SetupSearcherScreen } from './screens/setup-searcher/setup-searcher-screen';

export function Router() {
  const { theme } = useStyle('dark');
  document.body.style.backgroundColor = theme.active.main;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
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
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
