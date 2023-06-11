import { IUser, User } from '../../../../shared/infra/model/user';
import {
  CreateUserInput,
  CreateUserResult,
  UserServiceAPI,
} from '../userServiceAPI';

export class UserServiceImpl implements UserServiceAPI {
  constructor() {
    //
  }

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserResult> {
    const { username, password, age } = createUserInput;

    // check if user already exists
    try {
      const alreadyCreatedUser: IUser | null = await User.findOne({ username });

      if (alreadyCreatedUser) {
        return { success: false, error: 'Already Created' };
      }

      const newUser: IUser = await User.create({ username, password, age });
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: 'Exception' };
    }
  }
}
