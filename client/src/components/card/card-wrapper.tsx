import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export function CardWrapper(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { styles } = useStyle();

  return (
    <div style={combine([styles.container, props.style])}>{props.children}</div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      backgroundColor: theme.active.light,
      padding: dimensions.gutterMedium,
      borderRadius: dimensions.radiusSmall,
      ...shared.shadow,
    },
  };
});
