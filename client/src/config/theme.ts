import { configureTheme, generateTheme } from '@src/modules/css-in-jsx';

const palette = {
  white: 'white',
  black: 'black',
  red: '#990000',
  darkGray: '#212529',
};

export const { ThemeProvider, createUseStyle } = configureTheme({
  theme: generateTheme({
    accent: {
      main: palette.red,
      contrast: {
        main: palette.white,
      },
    },
  }),
  dimensions: {
    gutterSmall: 8,
    gutterMedium: 16,
    gutterLarge: 24,
  },
  createSharedStyles: (theme) => ({
    typography: {
      default: {
        fontSize: 16,
      },
    },
  }),
});
