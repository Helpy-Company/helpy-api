import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import Company from '../entities/Company';

interface RequestDTO {
  email: string;
  password: string;
}
interface ResponseDTO {
  token: string;
  company: Company;
}

class AuthenticateCompanyService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({ where: { email } });

    if (!company) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, company.password);

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
