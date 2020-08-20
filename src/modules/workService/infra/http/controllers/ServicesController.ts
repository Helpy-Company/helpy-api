import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServicesService from '@modules/workService/services/CreateServicesService';
import ListServiceService from '@modules/workService/services/ListServiceService';

class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      filters,
      description,
      title,
      service_category,
    } = request.body;

    const createService = container.resolve(CreateServicesService);

    const service = await createService.execute({
      user_id: request.user.id,
      filters,
      description,
      title,
      service_category,
    });

    return response.json(service);
  }

  public async index(request: Request, response: Response): Promise<Reponse> {
    const listServices = container.resolve(ListServiceService);

    const services = await listServices.execute();

    return response.json(services);
  }
}

export default ServicesController;
