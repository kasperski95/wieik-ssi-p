import { AbstractEndpoint } from '../../abstractions/endpoint';
import { UserRepository } from './user-repository';
import { UserRoles } from './user-types';

export class UserEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private userRepository: UserRepository) {
    super(route);
  }

  main() {
    this.get(
      async (req, res) => {
        const users = await this.userRepository.find();
        res.send(users);
      },
      { authorize: [UserRoles.admin] }
    );
  }
}
