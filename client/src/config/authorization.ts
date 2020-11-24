import { User, UserRoles } from '@src/models/user';

export enum Privileges {
  seeLogin,
  seeRegistration,
  seeSetupSearcher,
  uploadSetup,
  seeMySetups,
  seeUsers,
}

export function isAuthorized(
  user: User | undefined | null,
  privilege: Privileges
) {
  const userPrivileges = [
    Privileges.seeSetupSearcher,
    Privileges.uploadSetup,
    Privileges.seeMySetups,
  ];
  switch (user?.role) {
    case UserRoles.user:
      return userPrivileges.includes(privilege);
    case UserRoles.admin:
      return [...userPrivileges, Privileges.seeUsers].includes(privilege);
    default:
      //guest
      return [Privileges.seeLogin, Privileges.seeRegistration].includes(
        privilege
      );
  }
}
