import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function Screen(props: { children: React.ReactNode }) {
  const { styles } = useStyle();

  return <div style={styles.container}>{props.children}</div>;
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    maxWidth: 1366,
    width: '100%',
    margin: '0 auto',
    paddingLeft: dimensions.gutterMedium,
    paddingRight: dimensions.gutterMedium,
  },
}));
