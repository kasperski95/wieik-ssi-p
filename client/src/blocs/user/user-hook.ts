import { UserBloc } from './user-bloc';

let instance: UserBloc | null;

export function useUserBloc() {
  if (instance == null) instance = new UserBloc();

  return instance;
}
