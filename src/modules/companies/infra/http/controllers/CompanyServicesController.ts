import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAllServices from '@modules/companies/services/ListAllServices';
import { classToClass } from 'class-transformer';

class CompanyServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listServices = container.resolve(ListAllServices);

    const services = await listServices.execute(id);

    return response.json(classToClass(services));
  }
}

export default CompanyServiceController;
