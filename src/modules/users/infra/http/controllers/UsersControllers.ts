import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserServices';
import ListUserServices from '@modules/users/services/ListUserServices';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, phone, password,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name, email, phone, password,
    });

    delete user.password;

    return response.json(user);
  }

  // TODO trocar esse index para um controller especifico para serviços de um unico user

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listServices = container.resolve(ListUserServices);

    const services = await listServices.execute(id);

    return response.json(services);
  }
}

export default UsersControllers;
