import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServicesService from '@modules/workService/services/CreateServicesService';
import ListServiceService from '@modules/workService/services/ListServiceService';
import DeleteServicesService from '@modules/workService/services/DeleteServicesService';
import UpdateServicesService from '@modules/workService/services/UpdateServicesService';
import { classToClass, serialize } from 'class-transformer';

class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      area,
      CEP,
    } = request.body;

    const createService = container.resolve(CreateServicesService);

    const service = await createService.execute({
      contractor_id: request.user.id,
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      area,
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

    const deleteService = container.resolve(DeleteServicesService);

    await deleteService.execute({
      service_id: id,
      contractor_id: request.user.id,
    });

    return response.status(200).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      area,
      CEP,
      service_id,
    } = request.body;

    const updateService = container.resolve(UpdateServicesService);

    const service = await updateService.execute({
      contractor_id: request.user.id,
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      area,
      CEP,
      service_id,
    });
    return response.json(
      classToClass(service, { excludePrefixes: ['contractor'] })
    );
  }
}

export default ServicesController;
