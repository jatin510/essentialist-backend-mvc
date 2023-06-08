import { Request, Response } from 'express';
import { User } from '../model/user';

export const createUser = async (req: Request, res: Response) => {
  const { username, password, age } = req.body;

  // check if user already exists
  try {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error('User already exists');
    }
  } catch (error: any) {
    return res.status(400).json({ ok: false, error: error.message });
  }

  try {
    const user = await User.create({ username, password, age });
    return res.status(201).json({ ok: true, data: user });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { username, password, age, id } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error('User not exists');
    }
  } catch (error: any) {
    return res.status(400).json({ ok: false, error: error.message });
  }

  try {
    const user = await User.updateOne({ _id: id }, { username, password, age });
    return res.status(201).json({ ok: true, data: user });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error });
  }
};
