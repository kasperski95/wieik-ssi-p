import { User, UserRoles } from '@src/models/user';
import { Bloc } from '@src/modules/react-bloc';
import axios from 'axios';
import * as UserEvents from './user-event';
import * as UserStates from './user-state';

export class UserBloc extends Bloc<UserEvents.UserEvent, UserStates.UserState> {
  constructor() {
    super(new UserStates.Identifying());
  }

  public jwt: string | null = null;
  public user: User | null = null;

  async *mapEventToState(event: UserEvents.UserEvent) {
    if (event instanceof UserEvents.Init) {
      this.jwt = localStorage.getItem('jwt');
      if (this.jwt) this.dispatch(new UserEvents.Change(this.jwt));
      else yield new UserStates.Guest();
    } else if (event instanceof UserEvents.Change) {
      localStorage.setItem('jwt', event.jwt);
      this.jwt = event.jwt;
      if (this.jwt) {
        try {
          this.user = (
            await axios.get(`${process.env.REACT_APP_API}/auth`, {
              headers: {
                authorization: `Bearer ${this.jwt}`,
              },
            })
          ).data;

          switch (this.user!.role) {
            case UserRoles.user:
              yield new UserStates.User(this.user!, this.jwt);
              break;
            case UserRoles.admin:
              yield new UserStates.Admin(this.user!, this.jwt);
              break;
            default:
              throw new Error('Unhandled role');
          }
        } catch (err) {
          yield new UserStates.Guest();
        }
      } else {
        yield new UserStates.Guest();
      }
    } else if (event instanceof UserEvents.Logout) {
      localStorage.removeItem('jwt');
      this.jwt = null;
      this.user = null;
      yield new UserStates.Guest();
    }
  }
}
