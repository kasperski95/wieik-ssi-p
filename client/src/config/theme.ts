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
    radiusSmall: 8,
    radiusMedium: 16,
  },
  createSharedStyles: (theme) => ({
    typography: {
      default: {
        fontSize: 16,
      },
      action: {
        color: theme.accent.main,
        fontWeight: 'bold',
      },
    },
    shadow: {
      boxShadow:
        '0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)',
    },
  }),
});
