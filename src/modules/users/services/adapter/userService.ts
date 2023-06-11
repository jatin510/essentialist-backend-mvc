import { IUser, User } from '../../../../shared/infra/model/user';
import {
  CreateUserInput,
  CreateUserResult,
  EditUserInput,
  EditUserResult,
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

  async editUser(editUserInput: EditUserInput): Promise<EditUserResult> {
    const { username, password, age, id } = editUserInput;

    try {
      const alreadyCreatedUser: IUser | null = await User.findOne({ _id: id });

      if (!alreadyCreatedUser) {
        return { success: false, error: 'User not found' };
      }

      const updatedUser: IUser | null = await User.findOneAndUpdate(
        { _id: id },
        { username, password, age },
        { new: true },
      );
      return { success: true, data: updatedUser };
    } catch (error) {
      return { success: false, error: 'Exception' };
    }
  }
}
