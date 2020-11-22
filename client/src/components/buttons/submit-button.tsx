import { createUseStyle, ThemeProvider } from '@src/config/theme';
import React from 'react';
import { Ripple } from './ripple';
import { ButtonProps } from './types';

export function SubmitButton(props: ButtonProps) {
  const { styles, theme } = useStyle('clickable');

  return (
    <ThemeProvider theme={theme}>
      <Ripple
        style={{ color: theme.clickable.contrast.main }}
        onClick={props.onClick}
      >
        <div style={styles.button(!props.onClick)}>{props.label}</div>
      </Ripple>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  button: (disabled: boolean) => ({
    ...shared.typography.submit,
    padding: dimensions.gutterLarge,
    paddingTop: dimensions.gutterMedium,
    paddingBottom: dimensions.gutterMedium,
    backgroundColor: disabled ? theme.active.weak : theme.active.strong,
    borderRadius: dimensions.radiusSmall,
  }),
}));
