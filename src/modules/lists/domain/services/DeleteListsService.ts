import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IListsRepository from '../repositories/IListsRepository';

interface IRequestDTO {
  provider_id: string;
  list_id: string;
}

@injectable()
class DeleteListsService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ list_id, provider_id }: IRequestDTO): Promise<void> {
    const provider = await this.providersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists');
    }
    await this.cacheProvider.invalidate(`lists-list:no-auth`);

    await this.listsRepository.delete(list_id);
  }
}

export default DeleteListsService;
