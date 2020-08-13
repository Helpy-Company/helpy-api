import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServicesService from '@modules/workService/services/CreateServicesService';

class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      filters,
      description,
      title,
      service_category,
    } = request.body;

    const createService = container.resolve(CreateServicesService);

    const service = await createService.execute({
      user_id,
      filters,
      description,
      title,
      service_category,
    });

    return response.json(service);
  }
}

export default ServicesController;
