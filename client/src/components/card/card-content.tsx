import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Button } from '../buttons';

export function CardContent(props: {
  title: string;
  actions?: { name: string; callback?: () => void }[];
  children: React.ReactChild;
}) {
  const { styles } = useStyle();

  const shouldRenderActions = !!props.actions;

  return (
    <div style={styles.container}>
      <div style={styles.title}>{props.title}</div>
      <div>{props.children}</div>
      {shouldRenderActions && (
        <React.Fragment>
          <div style={styles.actionGutter} />
          <div style={styles.actionWrapper}>
            {props.actions!.map((action) => {
              return (
                <Button.Flat
                  key={action.name}
                  label={action.name}
                  onClick={action.callback}
                />
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      ...shared.typography.default,
    },

    title: shared.typography.h2,

    actionWrapper: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: theme.active.main,
      margin: -dimensions.gutterMedium,
      marginTop: 0,
      marginBottom: -dimensions.gutterSmall,
    },

    actionGutter: {
      marginTop: dimensions.gutterSmall,
    },
  };
});
