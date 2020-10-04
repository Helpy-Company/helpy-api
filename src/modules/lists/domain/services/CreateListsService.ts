import List from '@modules/lists/infra/typeorm/entities/List';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';
import { inject, injectable } from 'tsyringe';
import { IMaterialsList } from '../dtos/ICreateListsDTO';

interface IRequest {
  title: string;
  description: string;
  provider_id: string;
  materials_lists: IMaterialsList[];
}

@injectable()
class CreateListsService {
  constructor(
    @inject('ListsRepository')
    private listRepository: ListsRepository
  ) {}

  public async execute({
    title,
    description,
    materials_lists,
    provider_id,
  }: IRequest): Promise<List> {
    const list = await this.listRepository.create({
      title,
      description,
      materials_lists,
      provider_id,
    });

    return list;
  }
}

export default CreateListsService;
