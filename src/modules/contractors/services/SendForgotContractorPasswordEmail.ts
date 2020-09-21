import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IContractorsRepository from '@modules/contractors/repositories/IContractorsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IContractorsTokensRepository from '../repositories/IContractorsTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotContractorPasswordEmailService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ContractorsTokensRepository')
    private contractorsTokensRepository: IContractorsTokensRepository
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const contractor = await this.contractorsRepository.findByEmail(email);

    if (!contractor) {
      throw new AppError('Contractors does not exists.');
    }

    const { token } = await this.contractorsTokensRepository.generate(
      contractor.id
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: contractor.name,
        email: contractor.email,
      },
      subject: '[helpy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: contractor.name,
          token,
          link: `${process.env.APP_WEB_URL}/contractor-reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotContractorPasswordEmailService;
