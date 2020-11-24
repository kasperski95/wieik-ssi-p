import { FetcherEvents, useFetcherBloc } from '@src/blocs/fetcher';
import { Card } from '@src/components/card';
import { Fetcher } from '@src/components/fetcher';
import { Screen } from '@src/components/screen';
import { useCrud } from '@src/config/create-crud';
import { endpoints } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { User, UserStatus } from '@src/models/user';
import React from 'react';

export function UsersScreen() {
  const { styles } = useStyle();
  const { read, update } = useCrud();
  const fetcherBloc = useFetcherBloc('users', async () => {
    return (await read(endpoints.user)) as User[];
  });

  React.useEffect(() => {
    fetcherBloc.dispatch(new FetcherEvents.Fetch());
  });

  return (
    <Screen showGoBack={true} title='Users'>
      <Fetcher
        fetcherBloc={fetcherBloc}
        builder={(users) => {
          return (
            <React.Fragment>
              {users.map((user) => {
                return (
                  <Card.Wrapper key={user.id}>
                    <Card.Content
                      title={`${user.username}`}
                      actions={[
                        {
                          label:
                            user.status === UserStatus.blocked
                              ? 'Unblock'
                              : 'Block',
                          onClick: async () => {
                            await update(
                              endpoints.user,
                              {
                                status:
                                  user.status === UserStatus.blocked
                                    ? UserStatus.active
                                    : UserStatus.blocked,
                              },
                              {
                                query: {
                                  suffix: '/:id',
                                  data: { id: user.id },
                                },
                              }
                            );
                            fetcherBloc.dispatch(new FetcherEvents.Fetch());
                          },
                        },
                      ]}
                    >
                      <div>e-mail: {user.email}</div>
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
