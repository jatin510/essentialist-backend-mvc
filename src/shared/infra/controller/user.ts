import { Request, Response } from 'express';
import { IUser, User } from '../model/user';
import { UserServiceAPI } from '../../../modules/users/services/userServiceAPI';

export const createUserControllerFactory = (userService: UserServiceAPI) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await userService.createUser(req.body);
      if (response.success) {
        return res.status(201).json({ ok: true, data: response.data });
      }

      switch (response.error) {
        case 'Already Created':
          return res
            .status(409)
            .json({ ok: false, error: 'Collison ! Already created' });
        case 'Validation Error':
          return res.status(400).json({
            ok: false,
            error: 'You did something wrong',
          });
        case 'Exception':
          return res
            .status(500)
            .json({ ok: false, error: 'Something went wrong' });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, error: 'Something went wrong' });
    }
  };
};

export const editUser = async (req: Request, res: Response) => {
  const { username, password, age, id } = req.body;

  try {
    const user: IUser | null = await User.findOne({ _id: id });

    if (!user) {
      throw new Error('User not exists');
    }
  } catch (error: any) {
    return res.status(400).json({ ok: false, error: error.message });
  }

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      { _id: id },
      { username, password, age },
      { new: true },
    );
    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error });
  }
};
