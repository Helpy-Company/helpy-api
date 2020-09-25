import { inject, injectable } from 'tsyringe';
import path from 'path';
import { formatToCPFOrCNPJ, isCNPJ, isCEP, isCPF } from 'brazilian-values';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICategoryRepository from '@modules/workService/repositories/ICategoryRepository';
import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';
import IProviderTokensRepository from '../repositories/IProviderTokensRepository';

interface IRequestDTO {
  name: string;
  fantasyName: string;
  documentNumber: string;
  CEP: string;
  phone: string;
  email: string;
  password: string;
  service_categories_ids: string[];
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ProvidersTokenRepository')
    private providersTokenRepository: IProviderTokensRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) { }

  public async execute({
    name,
    fantasyName,
    documentNumber,
    phone,
    email,
    password,
    CEP,
    service_categories_ids,
  }: IRequestDTO): Promise<Provider> {
    const providerExists = await this.providersRepository.findByEmail(email);

    if (providerExists) {
      throw new AppError('Provider already exists.');
    }

    const formattedDocumentNumber = formatToCPFOrCNPJ(documentNumber);

    const isCNPJValid = isCNPJ(formattedDocumentNumber);
    const isCPFValid = isCPF(formattedDocumentNumber);

    if (!isCNPJValid && !isCPFValid) {
      throw new AppError('Wrong CNPJ/CPF.');
    }

    const isCep = isCEP(CEP);

    if (!isCep) {
      throw new AppError('CEP não encontrado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const categories = await this.categoryRepository.findAllById(
      service_categories_ids
    );

    const provider = await this.providersRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      documentNumber: formattedDocumentNumber,
      CEP,
      fantasyName,
      service_categories: categories,
    });

    const verifyEmailTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'email_provider_verification.hbs'
    );
    const { token } = await this.providersTokenRepository.generate(provider.id);

    await this.mailProvider.sendMail({
      to: {
        email: provider.email,
      },
      subject: '[Helpy] Verificação de e-mail!',
      templateData: {
        file: verifyEmailTemplate,
        variables: {
          token,
          link: `${process.env.APP_WEB_URL}/email-provider-verification?token=${token}`,
        },
      },
    });

    return provider;
  }
}

export default CreateProviderService;
