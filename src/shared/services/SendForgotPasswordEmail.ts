import { getRepository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '../errors/AppError';
import EtherealMailProvider from '../container/providers/MailProvider/implementations/EtherealMailProvider';

interface IRequestDTO {
  email: string;
}

class SendForgotPasswordEmail {
  public async execute({ email }: IRequestDTO): Promise<void> {
    const usersRepository = getRepository(User);
    const usersTokenRepository = getRepository(UserToken);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    // TODO ao arrumar a arquitetura mudar essa logica para um reporitory separado
    const userToken = usersTokenRepository.create({ user_id: user.id });
    await usersTokenRepository.save(userToken);

    const mailProvider = new EtherealMailProvider();

    await mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha ${userToken}`,
    );
  }
}

export default SendForgotPasswordEmail;
