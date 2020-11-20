import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Button } from './buttons';

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
        <div>
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
      )}
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      ...shared.typography.action,
    },
    title: shared.typography.h2,
  };
});
