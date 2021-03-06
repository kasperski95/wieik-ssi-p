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

    this.post(async (req, res) => {
      const user = await this.userRepository.createAndSave({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: UserRoles.user,
      });
      res.send(user);
    });

    this.get(
      async (req, res) => {
        const users = await this.userRepository.find();
        res.send(users);
      },
      { authorize: [UserRoles.admin] }
    );

    this.put(
      async (req, res) => {
        const id = req.params.id;
        if (!id) throw new APIException(StatusCodes.BAD_REQUEST);

        const status = req.body.status;
        const user = await this.userRepository.update(id, { status });

        res.send(user);
      },
      { routeSuffix: '/:id', authorize: [UserRoles.admin] }
    );
  }
}
