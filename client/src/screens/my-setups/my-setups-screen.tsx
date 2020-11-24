import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { useUserBloc } from '@src/blocs/user';
import { Card } from '@src/components/card';
import { Fetcher } from '@src/components/fetcher';
import { Screen } from '@src/components/screen';
import { useCrud } from '@src/config/create-crud';
import { endpoints, setups as setupsURL } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { Setup } from '@src/models/setup';
import { humanizeTime } from '@src/utils/humanize-time';
import Case from 'case';
import React from 'react';

export function MySetupsScreen() {
  const { styles } = useStyle();
  const { read, remove } = useCrud();
  const userBloc = useUserBloc();
  const user = userBloc.user!;

  const fetcherBloc = useFetcherBloc(
    'my-setups',
    async (variables: { userId: string }) => {
      return (await read(endpoints.setup, {
        params: { u: variables.userId },
      })) as Setup[];
    }
  );

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch({ userId: user.id }));
  }, [user]);

  return (
    <Screen showGoBack={true} title='My Setups'>
      <Fetcher
        fetcherBloc={fetcherBloc}
        builder={(result) => {
          return (
            <React.Fragment>
              {result.map((setup) => {
                const title = `${Case.kebab(setup.track!.name)}_${Case.kebab(
                  setup.car!.brand!.name
                )}_${Case.kebab(setup.car!.name)}_${Case.kebab(
                  user.username
                )}.setup`;
                return (
                  <Card.Wrapper key={setup.id}>
                    <Card.Content
                      title={title}
                      actions={[
                        {
                          label: 'Download',
                          onClick: () => {
                            window.open(`${setupsURL}/${setup.filename}`);
                          },
                        },
                        {
                          label: 'Delete',
                          onClick: () => {
                            remove(endpoints.setup, {
                              query: { suffix: '/:id', data: { id: setup.id } },
                            }).then(() => {
                              fetcherBloc.dispatch(
                                new FetcherEvents.Fetch({ userId: user.id })
                              );
                            });
                          },
                        },
                      ]}
                    >
                      <div>
                        Default Setup Time: {humanizeTime(setup.timeBase)}
                      </div>
                      <div>This Setup Time: {humanizeTime(setup.time)}</div>
                    </Card.Content>
                  </Card.Wrapper>
                );
              })}
            </React.Fragment>
          );
        }}
      />
    </Screen>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {},
}));
