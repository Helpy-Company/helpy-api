import { inject, injectable } from 'tsyringe';
import {
  formatToCPFOrCNPJ, isCPF, isCNPJ, isCEP,
} from 'brazilian-values';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
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
    @inject('CompanyRepository')
    private companyRepository: CompaniesRepository,

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
    const companyExists = await this.companyRepository.findByEmail(email);

    if (companyExists) {
      throw new AppError('Company already exists.');
    }

    const formattedDocumentNumber = formatToCPFOrCNPJ(documentNumber);

    const isCPFValid = isCPF(formattedDocumentNumber);
    const isCNPJValid = isCNPJ(formattedDocumentNumber);

    if (!isCPFValid && !isCNPJValid) {
      throw new AppError('Wrong CPF/CNPJ.');
    }

    const isCep = isCEP(CEP);

    if (!isCep) {
      throw new AppError('CEP não encontrado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password, 8);

    const company = await this.companyRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      documentNumber: formattedDocumentNumber,
      CEP,
      fantasyName,
    });

    return company;
  }
}

export default CompanyService;
