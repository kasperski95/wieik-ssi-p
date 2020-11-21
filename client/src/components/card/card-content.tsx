import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Button } from '../buttons';

export function CardContent(props: {
  title: string;
  actions?: { label: string; onClick?: () => void }[];
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
                  key={action.label}
                  label={action.label}
                  onClick={action.onClick}
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

    title: shared.typography.h1,

    actionWrapper: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: theme.active.main,
      margin: -dimensions.gutterMedium,
      marginTop: 0,
    },

    actionGutter: {
      marginTop: dimensions.gutterMedium,
    },
  };
});
