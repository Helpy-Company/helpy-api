import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateCompanyProfileService from '@modules/companies/services/UpdateCompanyProfileService';
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

  public async update(request: Request, response: Response): Promise<Response> {
    const company_id = request.user.id;
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      old_password,
      phone,
      company_category,
    } = request.body;

    const updateProfile = container.resolve(UpdateCompanyProfileService);

    const company = await updateProfile.execute({
      company_id,
      name,
      fantasyName,
      email,
      password,
      CEP,
      old_password,
      documentNumber,
      phone,
      company_category,
    });

    return response.json(classToClass(company));
  }
}

export default CompanyController;
