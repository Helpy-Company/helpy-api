import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCompanyService from '../../../services/CreateCompanyService';

class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
    } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
      fantasyName,
      CEP,
      email,
      password,
      documentNumber,
      phone,
    });

    return response.json(classToClass(company));
  }
}

export default CompanyController;
