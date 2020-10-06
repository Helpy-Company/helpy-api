import List from '@modules/lists/infra/typeorm/entities/List';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListListsService {
  constructor(
    @inject('ListsRepository')
    private listRepository: ListsRepository,

    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute({ provider_id }: IRequest): Promise<List[]> {
    const provider = await this.providerRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists');
    }

    const list = await this.listRepository.findAllByProviderId(provider_id);

    return list;
  }
}

export default ListListsService;
