import { Router } from 'express';
import { editUser } from '../controller';
import { validateCreateUser, validateEditUser } from '../middleware/validators';
import { createUserController } from '../../../app';

export const userRoute = Router();

userRoute.post('/', validateCreateUser, (req, res) => {
  createUserController(req, res);
});
userRoute.put('/', validateEditUser, editUser);
