import React from 'react';
import { createUseStyle, combine } from '@src/modules/css-in-jsx';

export function Test() {
  const styles = useStyle();

  return <div style={combine([styles.container, styles.foo])}>test</div>;
}

const useStyle = createUseStyle((theme) => ({
  container: {
    fontSize: 64,
  },
  foo: {
    color: 'blue',
  },
}));
