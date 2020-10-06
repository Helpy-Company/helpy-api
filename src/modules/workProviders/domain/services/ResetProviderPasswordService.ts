import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IProviderTokensRepository from '../repositories/IProviderTokensRepository';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetProviderPasswordService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,

    @inject('ProvidersTokenRepository')
    private providersTokenRepository: IProviderTokensRepository
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const providerToken = await this.providersTokenRepository.findByToken(
      token
    );

    if (!providerToken) {
      throw new AppError('No register found.');
    }

    const provider = await this.providersRepository.findById(
      providerToken.provider_id
    );

    if (!provider) {
      throw new AppError('No register found.');
    }

    const providerTokenCreateAt = providerToken.created_at;
    const compareDate = addHours(providerTokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    provider.password = await this.hashProvider.generateHash(password);

    await this.providersRepository.save(provider);
  }
}

export default ResetProviderPasswordService;
