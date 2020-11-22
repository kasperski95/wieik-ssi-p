import { StatusCodes } from 'http-status-codes';
import { AbstractEndpoint } from '../../abstractions/endpoint';
import { APIException } from '../../abstractions/exception';
import { UserRepository } from './user-repository';
import { UserRoles } from './user-types';

export class UserEndpoint extends AbstractEndpoint<UserRoles> {
  constructor(route: string, private userRepository: UserRepository) {
    super(route);
  }

  main() {
    this.get(
      async (req, res) => {
        const id = req.params.id as string;
        if (!id) throw new APIException(StatusCodes.BAD_REQUEST);

        const user = await this.userRepository.findOne(id);

        if (!user) throw new APIException(StatusCodes.NOT_FOUND);
        user.password = '';
        res.send(user);
      },
      { routeSuffix: '/:id' }
    );

    this.get(
      async (req, res) => {
        const users = await this.userRepository.find();
        res.send(users);
      },
      { authorize: [UserRoles.admin] }
    );
  }
}
