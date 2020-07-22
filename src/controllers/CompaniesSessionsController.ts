import { Request, Response } from 'express';
import AuthenticateCompanyService from '../services/AuthenticateCompanyService';

class CompaniesSessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateCompany = new AuthenticateCompanyService();

    const { company, token } = await authenticateCompany.execute({
      email,
      password,
    });

    delete company.password;

    return response.json({ company, token });
  }
}

export default CompaniesSessionsControllers;
