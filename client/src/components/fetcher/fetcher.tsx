import { FetcherBloc, FetcherStates } from '@src/blocs/fetcher';
import { createUseStyle } from '@src/config/theme';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';
import { Card } from '../card';
import { LoadingIndicator } from '../loading-indicator';

export function Fetcher<S, T>(props: {
  fetcherBloc: FetcherBloc<S, T>;
  builder: (result: T) => JSX.Element;
}) {
  const { styles } = useStyle();

  return (
    <BlocBuilder
      bloc={props.fetcherBloc}
      builder={(state) => {
        if (state instanceof FetcherStates.Success) {
          return props.builder(state.result);
        } else if (state instanceof FetcherStates.Failure) {
          return (
            <Card.Wrapper style={styles.errorWrapper}>
              <Card.Content title='Error' titleStyle={styles.errorTitle}>
                <div style={styles.errorMessage}>{state.message}</div>
              </Card.Content>
            </Card.Wrapper>
          );
        } else if (state instanceof FetcherStates.Loading) {
          return (
            <div style={styles.loadingWrapper}>
              <LoadingIndicator />
            </div>
          );
        }

        return <div />;
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
  errorWrapper: {
    backgroundColor: theme.active.error.main,
  },
  errorTitle: {
    color: theme.active.error.contrast.strong,
  },
  errorMessage: {
    color: theme.active.error.contrast.weak,
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: dimensions.gutterLarge,
  },
}));
