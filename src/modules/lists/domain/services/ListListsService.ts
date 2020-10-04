import List from '@modules/lists/infra/typeorm/entities/List';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  provider_id: string;
}

@injectable()
class ListListsService {
  constructor(
    @inject('ListsRepository')
    private listRepository: ListsRepository
  ) {}

  public async execute({ provider_id }: IRequest): Promise<List[]> {
    const list = await this.listRepository.findAllByProviderId(provider_id);

    return list;
  }
}

export default ListListsService;
