import { inject, injectable } from 'tsyringe';
import path from 'path';
import {
  formatToCPFOrCNPJ, isCNPJ, isCEP,
} from 'brazilian-values';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Company from '../infra/typeorm/entities/Company';
import CompaniesRepository from '../infra/typeorm/repositories/CompaniesRepository';

interface IRequestDTO {
  name: string;
  fantasyName: string;
  documentNumber: string;
  CEP: string;
  phone: string;
  email: string;
  password: string;
}

@injectable()
class CompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    name,
    fantasyName,
    documentNumber,
    phone,
    email,
    password,
    CEP,
  }: IRequestDTO): Promise<Company> {
    const companyExists = await this.companiesRepository.findByEmail(email);

    if (companyExists) {
      throw new AppError('Company already exists.');
    }

    const formattedDocumentNumber = formatToCPFOrCNPJ(documentNumber);

    const isCNPJValid = isCNPJ(formattedDocumentNumber);

    if (!isCNPJValid) {
      throw new AppError('Wrong CNPJ.');
    }

    const isCep = isCEP(CEP);

    if (!isCep) {
      throw new AppError('CEP não encontrado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const company = await this.companiesRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      documentNumber: formattedDocumentNumber,
      CEP,
      fantasyName,
    });

    const verifyEmailTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'email_verification.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        email: company.email,
      },
      subject: '[Helpy] Verificação de e-mail!',
      templateData: {
        file: verifyEmailTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/email-verification`,
        },
      },
    });

    return company;
  }
}

export default CompanyService;
