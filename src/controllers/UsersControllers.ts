import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserServices';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, phone, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({ name, email, phone, password });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsersControllers;
