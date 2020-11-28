import { UserEvents, useUserBloc } from '@src/blocs/user';
import { BrandsFetcher } from '@src/components/fetcher/brands-fetcher';
import { CarsFetcher } from '@src/components/fetcher/car-fetcher';
import { SetupFetcher } from '@src/components/fetcher/setup-fetcher';
import { TracksFetcher } from '@src/components/fetcher/tracks-fetcher';
import { Screen } from '@src/components/screen';
import { Stepper } from '@src/components/stepper';
import {
  isAuthorized as isUserAuthorized,
  Privileges,
} from '@src/config/authorization';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function Home(props: {
  trackId?: string | null;
  brandId?: string | null;
  carId?: string | null;
}) {
  const { styles } = useStyle();
  const history = useHistory();
  const userBloc = useUserBloc();

  const isAuthorized = (privilege: Privileges) =>
    isUserAuthorized(userBloc.user, privilege);

  let activeIndex = 0;
  if (props.trackId) activeIndex = 1;
  if (props.trackId && props.brandId) activeIndex = 2;
  if (props.trackId && props.carId) activeIndex = 3;

  const handleStepperClick = (index: number) => {
    return history.go(-activeIndex + index);
  };

  return (
    <Screen
      title={() => {
        return (
          <div style={styles.titleWrapper}>
            <div style={styles.logo} />
            Setup Searcher
          </div>
        );
      }}
      actions={[
        isAuthorized(Privileges.seeUsers)
          ? {
              label: 'Users',
              onClick: () => {
                history.push(routes.users);
              },
            }
          : undefined,
        isAuthorized(Privileges.seeMySetups)
          ? {
              label: 'My Setups',
              onClick: () => {
                history.push(routes.mySetups);
              },
            }
          : undefined,
        !!userBloc.user
          ? {
              label: `Log Out (${userBloc.user.username})`,
              onClick: () => {
                userBloc.dispatch(new UserEvents.Logout());
              },
            }
          : undefined,
        isAuthorized(Privileges.seeRegistration)
          ? {
              label: 'Register',
              onClick: () => {
                history.push(routes.register);
              },
            }
          : undefined,
        isAuthorized(Privileges.seeLogin)
          ? {
              label: 'Log In',
              onClick: () => {
                history.push(routes.login);
              },
            }
          : undefined,
      ]}
    >
      <Stepper
        style={styles.stepper}
        activeIndex={activeIndex}
        steps={[
          {
            label: 'Choose Track',
            onClick: () => history.push(routes.home),
            renderer: <TracksFetcher />,
          },
          {
            label: 'Choose Brand',
            onClick: () => history.push(`${routes.home}?t=${props.trackId}`),
            renderer: <BrandsFetcher />,
          },
          {
            label: 'Choose Car',
            onClick: () =>
              history.push(
                `${routes.home}?t=${props.trackId}&b=${props.brandId}`
              ),
            renderer: <CarsFetcher brandId={props.brandId!} />,
          },
          {
            label: 'Choose Setup',
            renderer: (
              <SetupFetcher trackId={props.trackId!} carId={props.carId!} />
            ),
          },
        ]}
      />
    </Screen>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  stepper: {
    marginBottom: dimensions.gutterMedium,
  },

  logo: {
    width: 48,
    height: dimensions.appBarHeight,
    marginRight: dimensions.gutterMedium,
    backgroundImage: 'url(/assets/images/acc-logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center',
    display: 'inline-block',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
