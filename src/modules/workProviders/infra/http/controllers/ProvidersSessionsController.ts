import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateProviderService from '@modules/workProviders/services/AuthenticateProviderService';
import { classToClass } from 'class-transformer';

class ProviderSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateProvider = container.resolve(AuthenticateProviderService);

    const { provider, token } = await authenticateProvider.execute({
      email,
      password,
    });

    return response.json(classToClass({ provider, token }));
  }
}

export default ProviderSessionsController;
