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
      <div style={styles.contentWrapper}>
        <div style={styles.content}>{props.children}</div>
      </div>
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  contentWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: dimensions.gutterMedium,
    paddingRight: dimensions.gutterMedium,
  },
  content: {
    flex: 1,
    maxWidth: dimensions.widthLimiter,
  },
  gutter: {
    marginBottom: dimensions.gutterMedium,
  },
}));
