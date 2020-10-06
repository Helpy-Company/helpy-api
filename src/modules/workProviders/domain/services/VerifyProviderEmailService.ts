import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import IProviderTokensRepository from '@modules/workProviders/domain/repositories/IProviderTokensRepository';

@injectable()
class VerifyProviderEmailService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository,

    @inject('ProvidersTokenRepository')
    private providerTokenRepository: IProviderTokensRepository
  ) {}

  public async execute(token: string): Promise<void> {
    const providerToken = await this.providerTokenRepository.findByToken(token);

    if (!providerToken) {
      throw new AppError('Provider does not exists');
    }

    const provider = await this.providerRepository.findById(
      providerToken.provider_id
    );

    if (!provider) {
      throw new AppError('Provider does not exists');
    }

    if (!(providerToken.provider_id === provider.id)) {
      throw new AppError('Invalid token');
    }

    provider.verified_email = true;

    await this.providerRepository.save(provider);
  }
}

export default VerifyProviderEmailService;
