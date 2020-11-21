import Color from 'color';
import { Theme } from './types';

const palette = {
  white: '#EAEAEA',
  black: '#111',
  red: 'red',
  green: 'green',
  orange: 'orange',
};

function generateMediumTheme(main: string, contrastMain: string) {
  const increaseContrast = (color: string, value: number) => {
    return (Color(main).isDark()
      ? Color(color).lighten(value)
      : Color(color).darken(value)
    ).toString();
  };

  const contrast = 1;

  return {
    main: main,
    weak: main, //increaseContrast(main, -contrast),
    strong: increaseContrast(main, contrast),
    light: Color(main).lighten(contrast).toString(),
    dark: Color(main).darken(contrast).toString(),

    contrast: {
      main: contrastMain,
      weak: increaseContrast(contrastMain, contrast),
      strong: increaseContrast(contrastMain, contrast),
      light: Color(contrastMain).lighten(contrast).toString(),
      dark: Color(contrastMain).darken(contrast).toString(),
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
    warning: {
      main: Color(palette.orange).mix(Color(main), 0.2).toString(),
    },
  };
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
