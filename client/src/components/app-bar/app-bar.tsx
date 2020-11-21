import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Button } from '../buttons';

export function AppBar(props: {
  title: string;
  actions?: { label: string; onClick?: () => void }[];
}) {
  const { styles } = useStyle();

  const shouldRenderActions = !!props.actions;

  return (
    <div style={styles.container}>
      <div style={styles.content(shouldRenderActions)}>
        <div style={styles.title}>{props.title}</div>
        {shouldRenderActions && (
          <React.Fragment>
            <div style={styles.gutter} />
            {props.actions!.map((action) => {
              return (
                <Button.Flat
                  key={action.label}
                  label={action.label}
                  onClick={action.onClick}
                />
              );
            })}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    ...shared.shadow,
    width: '100%',
    height: dimensions.appBarHeight,
    backgroundColor: theme.active.strong,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: dimensions.appBarIndex,
  },

  content: (actionsExist) => ({
    width: '100%',
    maxWidth: dimensions.widthLimiter,
    marginLeft: dimensions.gutterMedium,
    marginRight: actionsExist
      ? dimensions.gutterSmall
      : dimensions.gutterMedium,
    display: 'flex',
  }),

  title: { display: 'inline-block', ...shared.typography.title },

  gutter: {
    flex: 1,
    minWidth: dimensions.gutterMedium,
  },
}));
