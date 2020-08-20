import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateCompanyService from '@modules/companies/services/AuthenticateCompanyService';

class CompaniesSessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateCompany = container.resolve(AuthenticateCompanyService);

    const { company, token } = await authenticateCompany.execute({
      email,
      password,
    });

    delete company.password;

    return response.json({ company, token });
  }
}

export default CompaniesSessionsControllers;