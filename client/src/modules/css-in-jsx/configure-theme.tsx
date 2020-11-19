import React from 'react';
import { StylingCore, Theme, ThemeCore, UnlimitedDepthStyle } from './types';

export function configureTheme<T extends UnlimitedDepthStyle, D>(data: {
  theme: Theme;
  dimensions: D;
  createSharedStyles: (theme?: Theme) => T;
}) {
  const ThemeContext = React.createContext({} as StylingCore<T, D>);

  return {
    ThemeProvider: (props: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={data} children={props.children} />
    ),
    createUseStyle<S extends { [key: string]: React.CSSProperties }>(
      createStyle: (styles: { theme: Theme; dimensions: D; shared: T }) => S
    ) {
      return (themeName?: keyof ThemeCore) => {
        const { theme, dimensions, createSharedStyles } = React.useContext(
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
              shared: createSharedStyles(),
            })
          : createStyle({ theme, dimensions, shared: createSharedStyles() });

        return { theme, styles, dimensions, shared: createSharedStyles() };
      };
    },
  };
}
