import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import Provider from '../../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  email: string;
  password: string;
}
interface IResponseDTO {
  token: string;
  provider: Provider;
}

@injectable()
class AuthenticateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const provider = await this.providersRepository.findByEmail(email);

    if (!provider) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      provider.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!provider.verified_email) {
      throw new AppError('E-mail was not verified.', 401);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: provider.id,
      expiresIn,
    });

    return {
      provider,
      token,
    };
  }
}
export default AuthenticateProviderService;
