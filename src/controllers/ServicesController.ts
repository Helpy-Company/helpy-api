import { Request, Response } from 'express';
import CreateServicesService from '../services/CreateServicesService';

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
}

export default ServicesController;
