import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
  company_id: string;
  name: string;
  email: string;
  fantasyName?: string;
  phone?: string;
  CEP?: string;
  documentNumber?: string;
  old_password?: string;
  password?: string;
  company_category?: string
}

@injectable()
class UpdateCompanyProfileService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    company_id,
    name,
    email,
    fantasyName,
    phone,
    CEP,
    documentNumber,
    old_password,
    password,
    company_category,
  }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    const companyWithUpdatedEmail = await this.companiesRepository.findByEmail(email);

    if (companyWithUpdatedEmail && companyWithUpdatedEmail.id !== company_id) {
      throw new AppError('E-mail already in use.');
    }
    // atualiza email e nome
    company.name = name;
    company.email = email;

    // atualiza cep, documentNumber, phone, fantasyName
    company.CEP = CEP || company.CEP;
    company.documentNumber = documentNumber || company.documentNumber;
    company.phone = phone || company.phone;
    company.fantasyName = fantasyName || company.fantasyName;
    company.company_category = company_category || company.company_category;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        company.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      company.password = await this.hashProvider.generateHash(password);
    }

    return this.companiesRepository.save(company);
  }
}

export default UpdateCompanyProfileService;
