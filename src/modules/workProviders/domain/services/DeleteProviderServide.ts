import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
class DeleteProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const provider = await this.providerRepository.findById(id);

    if (!provider) {
      throw new AppError('Provider does not exists.');
    }

    await this.providerRepository.delete(id);
  }
}

export default DeleteProviderService;
