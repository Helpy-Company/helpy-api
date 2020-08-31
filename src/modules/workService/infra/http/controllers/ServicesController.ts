import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServicesService from '@modules/workService/services/CreateServicesService';
import ListServiceService from '@modules/workService/services/ListServiceService';
import DeleteServiceServices from '@modules/workService/services/DeleteServiceServices';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListServiceService);

    const services = await listServices.execute();

    return response.json(services);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteService = container.resolve(DeleteServiceServices);

    await deleteService.execute(id);

    return response.status(200).send();
  }
}

export default ServicesController;
