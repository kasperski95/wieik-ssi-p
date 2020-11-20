import React from 'react';
import { ThemeProvider } from './config/theme';
import { Bloc } from './modules/react-bloc';
import { Router } from './router';

export function App() {
  Bloc.logger = console;

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
