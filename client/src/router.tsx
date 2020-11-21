import { createUseStyle, ThemeProvider } from '@src/config/theme';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SetupSearcherScreen } from './screens/setup-searcher/setup-searcher-screen';

export function Router() {
  const { theme } = useStyle('light');

  document.body.style.backgroundColor = theme.active.main;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {/* <Route path='/foo'>foo</Route> */}
          <Route path='/'>
            <SetupSearcherScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
