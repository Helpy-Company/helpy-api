import { Request, Response } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';

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

    const createCompany = new CreateCompanyService();

    const company = await createCompany.execute({
      name,
      fantasyName,
      CEP,
      email,
      password,
      documentNumber,
      phone,
    });

    delete company.password;

    return response.json(company);
  }
}

export default CompanyController;
