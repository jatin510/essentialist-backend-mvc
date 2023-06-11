import { IUser, User } from '../../../shared/infra/model/user';

export type CreateUserInput = {
  username: string;
  password: string;
  age: number;
};

export type SuccessfulResult = {
  success: true;
  data: IUser;
};

export type FailureResult = {
  success: false;
  error: 'Already Created' | 'Validation Error' | 'Exception';
};

export type CreateUserResult = SuccessfulResult | FailureResult;

export interface UserServiceAPI {
  createUser(createUserInput: CreateUserInput): Promise<CreateUserResult>;
}
