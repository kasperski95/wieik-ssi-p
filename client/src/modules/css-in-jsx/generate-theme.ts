import Color from 'color';
import { Theme } from './types';

const palette = {
  white: 'white',
  black: 'black',
  red: 'red',
  green: 'green',
  orange: 'orange',
};

function generateMediumTheme(main: string, contrastMain: string) {
  return {
    main: main,
    weak: Color(main).darken(0.1).toString(),
    strong: Color(main).lighten(0.1).toString(),
    contrast: {
      main: contrastMain,
      weak: Color(contrastMain).lighten(0.1).toString(),
      strong: Color(contrastMain).darken(0.1).toString(),
    },
    divider: {
      main: Color(main).mix(Color(contrastMain), 0.2).toString(),
    },
    success: {
      main: Color(palette.green).mix(Color(main), 0.2).toString(),
    },
    error: {
      main: Color(palette.red).mix(Color(main), 0.2).toString(),
    },
    warn: {
      main: Color(palette.orange).mix(Color(main), 0.2).toString(),
    },
  };
}

export function configureStyling<
  T extends { [key: string]: React.CSSProperties },
  D
>(data: {
  theme: Theme;
  dimensions: D;
  createTypography: (theme?: Theme) => T;
}) {
  return data;
}

export function generateTheme(theme: {
  accent: { main: string; contrast: { main: string } };
}): Theme {
  return {
    get active() {
      return this.light;
    },
    light: generateMediumTheme(palette.white, palette.black),
    dark: generateMediumTheme(palette.black, palette.white),
    accent: generateMediumTheme(theme.accent.main, theme.accent.contrast.main),
  };
}
