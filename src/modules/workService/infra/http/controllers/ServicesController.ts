import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServicesService from '@modules/workService/services/CreateServicesService';
import ListServiceService from '@modules/workService/services/ListServiceService';
import DeleteServiceServices from '@modules/workService/services/DeleteServiceServices';

class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      CEP,
    } = request.body;

    const createService = container.resolve(CreateServicesService);

    const service = await createService.execute({
      user_id: request.user.id,
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      CEP,
    });

    return response.json(service);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListServiceService);

    const services = await listServices.execute();

    return response.json(services);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteService = container.resolve(DeleteServiceServices);

    await deleteService.execute({
      service_id: id,
      user_id: request.user.id,
    });

    return response.status(200).send();
  }
}

export default ServicesController;
