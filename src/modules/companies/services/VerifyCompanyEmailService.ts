import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICompanyTokensRepository from '@modules/companies/repositories/ICompanyTokensRepository';
import { addHours, isAfter } from 'date-fns';

@injectable()
class VerifyCompanyEmailService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('CompaniesTokenRepository')
    private companiesTokenRepository: ICompanyTokensRepository,

  ) { }

  public async execute(token: string): Promise<void> {
    const companyToken = await this.companiesTokenRepository.findByToken(token);

    if (!companyToken) {
      throw new AppError('User does not exists');
    }

    const company = await this.companiesRepository.findById(companyToken.company_id);

    if (!company) {
      throw new AppError('User does not exists');
    }

    if (!(companyToken.company_id === company.id)) {
      throw new AppError('Invalid token');
    }
    const tokenCreateAt = companyToken.created_at;
    const compareDate = addHours(tokenCreateAt, 5);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    company.verified_email = true;

    await this.companiesRepository.save(company);
  }
}

export default VerifyCompanyEmailService;
