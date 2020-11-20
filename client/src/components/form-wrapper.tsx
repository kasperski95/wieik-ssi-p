import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Card } from './card';

export function FormWrapper(props: { children: React.ReactNode }) {
  const { styles } = useStyle();

  return <Card style={styles.container}>{props.children}</Card>;
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      flexDirection: 'column',
    },
  };
});
