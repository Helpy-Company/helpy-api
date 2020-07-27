import { Request, Response } from 'express';
import CreateServicesService from '../services/CreateServicesService';
import ListUserServices from '../services/ListUserServices';

class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        user_id,
        filters,
        description,
        title,
        service_category,
      } = request.body;

      const createService = new CreateServicesService();

      const service = await createService.execute({
        user_id,
        filters,
        description,
        title,
        service_category,
      });

      delete service.user.password;

      return response.json(service);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const listServices = new ListUserServices();

      const services = await listServices.execute(id);

      return response.json(services);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default ServicesController;
