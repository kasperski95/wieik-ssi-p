type Color = string;

export interface ColorGroup {
  main: Color;
  weak: Color;
  strong: Color;
}

export interface MiniTheme extends ColorGroup {
  contrast: ColorGroup;
}

export interface Theme {
  primary: MiniTheme;
  secondary: MiniTheme;
  accent: MiniTheme;
  divider: {
    main: Color;
  };
}
