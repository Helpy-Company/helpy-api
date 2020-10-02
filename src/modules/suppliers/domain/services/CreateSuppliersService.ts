import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
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
    const checkEmailExists = await this.suppliersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Supplier already exists');
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
