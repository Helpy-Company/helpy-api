import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISuppliersTokensRepository from '../repositories/ISuppliersTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotSupplierPasswordEmailService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('SuppliersTokensRepository')
    private suppliersTokensRepository: ISuppliersTokensRepository
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const supplier = await this.suppliersRepository.findByEmail(email);

    if (!supplier) {
      throw new AppError('Suppliers does not exists.');
    }

    const { token } = await this.suppliersTokensRepository.generate(
      supplier.id
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'shared',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: supplier.fantasyName,
        email: supplier.email,
      },
      subject: '[helpy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: supplier.fantasyName,
          token,
          link: `${process.env.APP_WEB_URL}/supplier-reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotSupplierPasswordEmailService;
