import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCategoriesService from '@modules/workService/services/ListCategoriesService';

class ServicesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListCategoriesService);

    const services = await listServices.execute();

    return response.json(services);
  }
}

export default ServicesController;
