import {
  configureStyling,
  createStyleContext,
  generateTheme,
} from '@src/modules/css-in-jsx';

const palette = {
  white: 'white',
  black: 'black',
  red: '#990000',
  darkGray: '#212529',
};

export const styling = configureStyling({
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
  createTypography: (theme) => ({
    default: {
      fontSize: 16,
    },
  }),
});

export const { ThemeProvider, createUseStyle } = createStyleContext(styling);
