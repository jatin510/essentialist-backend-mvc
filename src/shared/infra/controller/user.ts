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

export const editUserControllerFactory = (userService: UserServiceAPI) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await userService.editUser(req.body);
      if (response.success) {
        return res.status(200).json({ ok: true, data: response.data });
      }

      switch (response.error) {
        case 'User not found':
          return res.status(404).json({ ok: false, error: 'User not found' });
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
