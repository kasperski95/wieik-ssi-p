import React from 'react';
import { StylingCore, Theme, ThemeCore } from './types';

export function createStyleContext<
  T extends { [key: string]: React.CSSProperties },
  D
>(data: { createTypography: (theme?: Theme) => T; dimensions: D }) {
  const ThemeContext = React.createContext({} as StylingCore<T, D>);

  return {
    ThemeProvider: ThemeContext.Provider,
    createUseStyle<S extends { [key: string]: React.CSSProperties }>(
      createStyle: (styles: { theme: Theme; dimensions: D; typography: T }) => S
    ) {
      return (themeName?: keyof ThemeCore) => {
        const { theme, dimensions, createTypography } = React.useContext(
          ThemeContext
        );

        const styles = themeName
          ? createStyle({
              theme: {
                ...theme,
                get active() {
                  return theme[themeName!];
                },
              },
              dimensions,
              typography: createTypography(),
            })
          : createStyle({ theme, dimensions, typography: createTypography() });

        return { theme, styles, dimensions, typography: createTypography() };
      };
    },
  };
}
