type Color = string;

export interface ColorGroupBase {
  main: Color;
}

export interface ColorGroup extends ColorGroupBase {
  weak: Color;
  strong: Color;
  light: Color;
  dark: Color;
}

export interface MiniTheme extends ColorGroup {
  contrast: ColorGroup;
}

export interface MediumTheme extends MiniTheme {
  divider: ColorGroupBase;
  success: ColorGroupBase;
  error: ColorGroupBase;
  warning: ColorGroupBase;
}

export interface ThemeCore {
  light: MediumTheme;
  dark: MediumTheme;
  accent: MediumTheme;
}

export interface Theme extends ThemeCore {
  active: MediumTheme;
}

export interface Style {
  [key: string]: React.CSSProperties | ((...args: any) => React.CSSProperties);
}

export type UnlimitedDepthStyle = {
  [key: string]:
    | React.CSSProperties
    | ((...args: any) => React.CSSProperties)
    | UnlimitedDepthStyle;
};

export interface StylingCore<T extends Style, D> {
  theme: Theme;
  dimensions: D;
  createSharedStyles: (theme: Theme) => T;
}

export interface Styling<S extends Style, T extends Style, D> {
  styles: S;
  theme: Theme;
  dimensions: D;
  typography: T;
}
