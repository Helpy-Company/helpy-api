import { inject, injectable } from 'tsyringe';
import path from 'path';
import Contractor from '@modules/contractors/infra/typeorm/entities/Contractor';
import AppError from '@shared/errors/AppError';
import IContractorsRepository from '@modules/contractors/repositories/IContractorsRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IContractorsTokensRepository from '../repositories/IContractorsTokensRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@injectable()
class CreateContractorService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ContractorsTokensRepository')
    private contractorsTokensRepository: IContractorsTokensRepository,
  ) { }

  public async execute({
    name,
    email,
    phone,
    password,
  }: IRequest): Promise<Contractor> {
    const checkEmailExists = await this.contractorsRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Contractor already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const contractor = await this.contractorsRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
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
    const { token } = await this.contractorsTokensRepository.generate(contractor.id);

    await this.mailProvider.sendMail({
      to: {
        name: contractor.name,
        email: contractor.email,
      },
      subject: '[helpy] Verificação de e-mail!',
      templateData: {
        file: verifyEmailTemplate,
        variables: {
          token,
<<<<<<< HEAD:src/modules/users/services/CreateUserServices.ts
          name: user.name,
          link: `${process.env.APP_WEB_URL}/email-user-verification?token=${token}`,
=======
          link: `${process.env.APP_WEB_URL}/email-contractor-verification?token=${token}`,
>>>>>>> dev:src/modules/contractors/services/CreateContractorService.ts
        },
      },
    });

    return contractor;
  }
}

export default CreateContractorService;
