import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { AppBar } from './app-bar';

export function Screen(props: {
  children: React.ReactNode;
  title: string;
  actions?: { label: string; onClick?: () => void }[];
}) {
  const { styles } = useStyle();

  return (
    <React.Fragment>
      <AppBar title={props.title} actions={props.actions} />
      <div style={styles.gutter} />
      <div style={styles.content}>{props.children}</div>
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: dimensions.gutterMedium,
    paddingRight: dimensions.gutterMedium,
    maxWidth: dimensions.widthLimiter,
    flexDirection: 'column',
  },

  gutter: {
    marginBottom: dimensions.gutterMedium,
  },
}));
