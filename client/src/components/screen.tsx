import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { AppBar } from './app-bar';

interface Action {
  label: string;
  onClick?: () => void;
}

export function Screen(props: {
  children: React.ReactNode;
  title: string;
  showGoBack?: boolean;
  style?: React.CSSProperties;
  actions?: (Action | undefined)[];
}) {
  const { styles } = useStyle();

  return (
    <React.Fragment>
      <AppBar
        title={props.title}
        actions={props.actions?.filter((el) => !!el) as Action[]}
        showGoBack={props.showGoBack}
      />
      <div style={combine([styles.contentWrapper])}>
        <div style={combine([styles.content, props.style])}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  contentWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: dimensions.gutterMedium,
    paddingLeft: dimensions.gutterMedium,
    paddingRight: dimensions.gutterMedium,
  },
  content: {
    flex: 1,
    maxWidth: dimensions.widthLimiter,
  },
}));
