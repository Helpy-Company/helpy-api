import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { addHours, isAfter } from 'date-fns';

@injectable()
class VerifyUserEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

  ) { }

  public async execute(token: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (!(userToken.user_id === user.id)) {
      throw new AppError('Invalid token');
    }
    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 5);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    user.verified_email = true;

    await this.usersRepository.save(user);
  }
}

export default VerifyUserEmailService;
