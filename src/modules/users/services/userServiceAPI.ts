import { IUser } from '../../../shared/infra/model/user';

export type CreateUserInput = {
  username: string;
  password: string;
  age: number;
};

export type EditUserInput = {
  id: string;
  username?: string;
  password?: string;
  age?: number;
};

export type SuccessfulResult = {
  success: true;
  data: IUser | null;
};

export type FailureResult = {
  success: false;
  error:
    | 'Already Created'
    | 'Validation Error'
    | 'Exception'
    | 'User not found';
};

export type CreateUserResult = SuccessfulResult | FailureResult;
export type EditUserResult = SuccessfulResult | FailureResult;

export interface UserServiceAPI {
  createUser(createUserInput: CreateUserInput): Promise<CreateUserResult>;
  editUser(editUserInput: EditUserInput): Promise<EditUserResult>;
}
