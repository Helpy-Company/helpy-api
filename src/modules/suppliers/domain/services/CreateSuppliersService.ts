import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { formatToCPFOrCNPJ, isCEP, isCNPJ } from 'brazilian-values';
import path from 'path';
import Supplier from '../../infra/typeorm/entities/Supplier';
import ICreateSupplierDTO from '../dtos/ICreateSuppliersDTO';
import ISuppliersRepository from '../repositories/ISuppliersRepository';
import ISuppliersTokensRepository from '../repositories/ISuppliersTokensRepository';

@injectable()
class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('SuppliersTokensRepository')
    private suppliersTokensRepository: ISuppliersTokensRepository
  ) {}

  public async execute({
    fantasyName,
    email,
    documentNumber,
    password,
    phone,
    accept_terms,
    CEP,
  }: ICreateSupplierDTO): Promise<Supplier> {
    const emailExists = await this.suppliersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already in use');
    }

    const documentNumberExists = await this.suppliersRepository.findByDocumentNumber(
      documentNumber
    );

    if (documentNumberExists) {
      throw new AppError('Document number already in use');
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

    if (!accept_terms) {
      throw new AppError(
        'Can not create account if dont agree with the applications terms of use'
      );
    }

    const supplier = await this.suppliersRepository.create({
      fantasyName,
      email,
      documentNumber,
      password: hashedPassword,
      phone,
      accept_terms,
      CEP,
    });

    const verifyEmailTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'shared',
      'views',
      'email_verification.hbs'
    );

    const { token } = await this.suppliersTokensRepository.generate(
      supplier.id
    );

    await this.mailProvider.sendMail({
      to: {
        name: supplier.fantasyName,
        email: supplier.email,
      },
      subject: '[helpy] Verificação de e-mail!',
      templateData: {
        file: verifyEmailTemplate,
        variables: {
          token,
          link: `${process.env.APP_WEB_URL}/email-supplier-verification?token=${token}`,
        },
      },
    });

    return supplier;
  }
}

export default CreateSupplierService;
