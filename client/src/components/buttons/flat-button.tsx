import { createUseStyle, ThemeProvider } from '@src/config/theme';
import React from 'react';
import { Ripple } from './ripple';

export function FlatButton(props: {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { theme, styles } = useStyle('accent');

  return (
    <ThemeProvider theme={theme}>
      <Ripple
        onClick={props.onClick}
        style={{ color: theme.active.main, ...styles.ripple }}
      >
        <div style={styles.button}>{props.label}</div>
      </Ripple>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    ripple: {
      borderRadius: dimensions.radiusSmall,
    },

    button: {
      padding: dimensions.gutterSmall,
      paddingLeft: dimensions.gutterMedium,
      paddingRight: dimensions.gutterMedium,
      overflow: 'hidden',
      ...shared.typography.action,
    },
  };
});
