import React from 'react';
import { StylingCore, Theme, ThemeCore, UnlimitedDepthStyle } from './types';

export function configureTheme<T extends UnlimitedDepthStyle, D>(data: {
  theme: Theme;
  dimensions: D;
  createSharedStyles: (theme: Theme) => T;
}) {
  const ThemeContext = React.createContext({} as StylingCore<T, D>);

  return {
    ThemeProvider: (props: { children: React.ReactNode; theme?: Theme }) => (
      <ThemeContext.Provider
        value={{ ...data, theme: props.theme || data.theme }}
        children={props.children}
      />
    ),
    createUseStyle<S extends { [key: string]: React.CSSProperties }>(
      createStyle: (styles: { theme: Theme; dimensions: D; shared: T }) => S
    ) {
      return (themeName?: keyof ThemeCore) => {
        const { theme, dimensions, createSharedStyles } = React.useContext(
          ThemeContext
        );

        const newTheme = themeName
          ? {
              ...theme,
              get active() {
                return theme[themeName!];
              },
            }
          : theme;

        const styles = createStyle({
          theme: newTheme,
          dimensions,
          shared: createSharedStyles(theme),
        });

        return {
          theme: newTheme,
          styles,
          dimensions,
          shared: createSharedStyles(theme),
        };
      };
    },
  };
}
