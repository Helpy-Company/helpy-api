import { getRepository } from 'typeorm';
import { formatToCPFOrCNPJ, isCPF, isCNPJ } from 'brazilian-values';
import cep from 'cep-promise';
import { hash } from 'bcrypt';
import Company from '../entities/Company';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  fantasyName: string;
  documentNumber: string;
  CEP: string;
  phone: string;
  email: string;
  password: string;
}

class CompanyService {
  public async execute({
    name,
    fantasyName,
    documentNumber,
    phone,
    email,
    password,
    CEP,
  }: RequestDTO): Promise<Company> {
    const companyRepository = getRepository(Company);

    const companyExists = await companyRepository.findOne({
      where: { documentNumber },
    });

    if (companyExists) {
      throw new AppError('Company already exists.');
    }

    const formattedDocumentNumber = formatToCPFOrCNPJ(documentNumber);

    const isCPFValid = isCPF(formattedDocumentNumber);
    const isCNPJValid = isCNPJ(formattedDocumentNumber);

    if (!isCPFValid && !isCNPJValid) {
      throw new AppError('Wrong CPF/CNPJ.');
    }

    const isCep = cep(CEP).catch();

    if (!isCep) {
      throw new AppError('CEP não encontrado.');
    }

    const hashedPassword = await hash(password, 8);

    const company = companyRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      documentNumber: formattedDocumentNumber,
      CEP,
      fantasyName,
    });

    await companyRepository.save(company);

    return company;
  }
}

export default CompanyService;
