import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListServicesByCategoryService from '@modules/companies/services/ListServicesByCategoryService';

class ListServiceByCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category } = request.query;

    const listServicesByCategory = container.resolve(ListServicesByCategoryService);

    const services = await listServicesByCategory.execute(String(category));

    return response.json(services);
  }
}

export default ListServiceByCategoryController;
