import express from 'express';
import { userRoute } from './shared/infra/route/user';
import { UserServiceImpl } from './modules/users/services/adapter/userService';
import { createUserControllerFactory } from './shared/infra/controller';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/user', userRoute);

export const userService = new UserServiceImpl();

export const createUserController = createUserControllerFactory(userService);

export default app;
