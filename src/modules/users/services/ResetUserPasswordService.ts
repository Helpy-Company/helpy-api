import { inject, injectable } from 'tsyringe';

import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Users does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Users does not exists');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
