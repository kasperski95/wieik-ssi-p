import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../buttons';

export function AppBar(props: {
  title: string;
  showGoBack?: boolean;
  actions?: { label: string; onClick?: () => void }[];
}) {
  const { styles } = useStyle();
  const history = useHistory();

  const shouldRenderActions = !!props.actions;

  return (
    <div style={styles.container}>
      <div style={styles.content(shouldRenderActions)}>
        <div style={styles.titleWrapper}>
          {props.showGoBack && (
            <Button.Icon
              rippleStyle={styles.iconButton}
              onClick={() => {
                history.length > 0 ? history.goBack() : history.push('/');
              }}
            >
              <ArrowBackIcon style={styles.arrow} />
            </Button.Icon>
          )}
          <div style={styles.title}>{props.title}</div>
        </div>
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
    marginRight: actionsExist ? 0 : dimensions.gutterMedium,
    display: 'flex',
  }),
  titleWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  title: {
    ...shared.typography.title,
    marginBottom: 3,
  },
  iconButton: {
    marginLeft: -dimensions.gutterMedium,
  },
  arrow: {
    width: '100%',
    height: '100%',
  },
  gutter: {
    flex: 1,
    minWidth: dimensions.gutterMedium,
  },
}));
