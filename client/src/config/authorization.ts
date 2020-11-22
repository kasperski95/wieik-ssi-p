import { User, UserRoles } from '@src/models/user';

export enum Privileges {
  seeLogin,
  seeRegistration,
  seeSetupSearcher,
}

export function isAuthorized(
  user: User | undefined | null,
  privilege: Privileges
) {
  switch (user?.role) {
    case UserRoles.user:
      return [Privileges.seeSetupSearcher].includes(privilege);
    case UserRoles.admin:
      return [Privileges.seeSetupSearcher].includes(privilege);
    default:
      //guest
      return [Privileges.seeLogin, Privileges.seeRegistration].includes(
        privilege
      );
  }
}
