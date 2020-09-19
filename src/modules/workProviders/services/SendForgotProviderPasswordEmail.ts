import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IProviderRepository from '@modules/workProviders/repositories/IProviderRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProviderTokensRepository from '../repositories/IProviderTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotProviderPasswordEmailService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ProvidersTokenRepository')
    private providerTokensRepository: IProviderTokensRepository,
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const provider = await this.providerRepository.findByEmail(email);

    if (!provider) {
      throw new AppError('Provider does not exists.');
    }

    const { token } = await this.providerTokensRepository.generate(provider.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: provider.name,
        email: provider.email,
      },
      subject: '[helpy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: provider.name,
          token,
          link: `${process.env.APP_WEB_URL}/provider-reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotProviderPasswordEmailService;
