import { Router } from 'express';
import { createUser, editUser } from '../controller';

export const userRoute = Router();

userRoute.post('/', createUser);
userRoute.put('/', editUser);
