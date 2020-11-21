import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Card } from './card';

export function FormWrapper(props: { children: React.ReactNode }) {
  const { styles } = useStyle();

  return <Card.Wrapper style={styles.container}>{props.children}</Card.Wrapper>;
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      flexDirection: 'column',
    },
  };
});
