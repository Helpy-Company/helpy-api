import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';
import CompaniesTokenRepository from '@modules/companies/infra/typeorm/repositories/CompaniesTokenRepository';

interface IRequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetCompanyPasswordService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,

    @inject('CompaniesTokenRepository')
    private companiesTokenRepository: CompaniesTokenRepository,

  ) { }

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const companyToken = await this.companiesTokenRepository.findByToken(token);

    if (!companyToken) {
      throw new AppError('No register found.');
    }

    const company = await this.companiesRepository.findById(companyToken.company_id);

    if (!company) {
      throw new AppError('No register found.');
    }

    const companyTokenCreateAt = companyToken.created_at;
    const compareDate = addHours(companyTokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    company.password = await this.hashProvider.generateHash(password);

    await this.companiesRepository.save(company);
  }
}

export default ResetCompanyPasswordService;
