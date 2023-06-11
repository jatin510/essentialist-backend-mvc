import { Router } from 'express';
import { validateCreateUser, validateEditUser } from '../middleware/validators';
import { createUserController, editUserController } from '../../../app';

export const userRoute = Router();

userRoute.post('/', validateCreateUser, (req, res) => {
  createUserController(req, res);
});
userRoute.put('/', validateEditUser, (req, res) => {
  editUserController(req, res);
});
