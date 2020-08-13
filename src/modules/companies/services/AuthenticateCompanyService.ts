import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import CompaniesRepository from '../infra/typeorm/repositories/CompaniesRepository';

interface IRequestDTO {
  email: string;
  password: string;
}
interface IResponseDTO {
  token: string;
  company: Company;
}

@injectable()
class AuthenticateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: CompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequestDTO): Promise<IResponseDTO> {
    const company = await this.companyRepository.findByEmail(email);

    if (!company) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, company.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });

    return {
      company,
      token,
    };
  }
}
export default AuthenticateCompanyService;
