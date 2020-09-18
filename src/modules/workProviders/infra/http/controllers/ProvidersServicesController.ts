import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAllServices from '@modules/workProviders/services/ListAllServices';

class ProviderServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listServices = container.resolve(ListAllServices);

    const services = await listServices.execute(id);

    return response.json(services);
  }
}

export default ProviderServiceController;
