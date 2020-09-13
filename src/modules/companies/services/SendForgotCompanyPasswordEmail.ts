import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICompanyTokensRepository from '../repositories/ICompanyTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotCompanyPasswordEmailService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CompaniesTokenRepository')
    private companiesTokensRepository: ICompanyTokensRepository,
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const company = await this.companiesRepository.findByEmail(email);

    if (!company) {
      throw new AppError('Company does not exists.');
    }

    const { token } = await this.companiesTokensRepository.generate(company.id);

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
        name: company.name,
        email: company.email,
      },
      subject: '[helpy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: company.name,
          token,
          link: `${process.env.APP_WEB_URL}/company-reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotCompanyPasswordEmailService;
