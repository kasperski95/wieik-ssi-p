import Color from 'color';
import { Theme } from './types';

const palette = {
  white: '#c0c0c0',
  black: '#202020',
  red: 'red',
  green: 'green',
  orange: 'orange',
};

function generateMediumTheme(main: string, contrastMain: string) {
  const increaseContrast = (color: string, value: number) => {
    if (Color(main).saturationv() < 80) {
      return (Color(main).isDark()
        ? Color(color).darken(value)
        : Color(color).lighten(value)
      ).toString();
    } else {
      return (value < 0
        ? Color(color).lighten(-value).saturate(value)
        : Color(color).lighten(value)
      ).toString();
    }
  };

  const contrast = 0.75;

  return {
    main: main,
    weak: Color(main).mix(Color(contrastMain), 0.4).toString(),
    strong: increaseContrast(main, contrast),
    light: Color(main).lighten(contrast).toString(),
    dark: Color(main).darken(contrast).toString(),

    contrast: {
      main: contrastMain,
      weak: Color(contrastMain).mix(Color(main), 0.4).toString(),
      strong: increaseContrast(contrastMain, -contrast),
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
