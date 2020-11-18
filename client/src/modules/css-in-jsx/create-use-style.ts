import React from 'react';
import { Theme } from './types';

const ThemeContext = React.createContext({} as Theme);

export const ThemeProvider = ThemeContext.Provider;

export function createUseStyle<
  T extends { [key: string]: React.CSSProperties }
>(stylesFactory: (theme: Theme) => T) {
  return () => stylesFactory(React.useContext(ThemeContext));
}
