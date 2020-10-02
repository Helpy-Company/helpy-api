import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAllServices from '@modules/workService/domain/services/ListServiceService';

class ProviderServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListAllServices);

    const services = await listServices.execute();

    return response.json(services);
  }
}

export default ProviderServiceController;
