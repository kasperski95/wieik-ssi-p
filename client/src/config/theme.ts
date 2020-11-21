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
      h2: {
        fontSize: 24,
        color: theme.active.contrast.strong,
      },
      default: {
        fontSize: 16,
        color: theme.active.contrast.main,
      },
      action: (disabled = false) => ({
        color: disabled ? theme.accent.weak : theme.accent.strong,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }),
    },
    shadow: {
      boxShadow:
        '0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)',
    },
  }),
});
