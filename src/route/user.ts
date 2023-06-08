import { Router } from 'express';
import { createUser, editUser } from '../controller';
import { validateCreateUser } from '../middleware/validators';

export const userRoute = Router();

userRoute.post('/', validateCreateUser, createUser);
userRoute.put('/', editUser);
