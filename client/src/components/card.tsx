import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function Card() {
  const { styles } = useStyle();

  return <div style={styles.container}></div>;
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {},
  };
});
