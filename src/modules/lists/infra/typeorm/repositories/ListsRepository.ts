import ICreateListsDTO from '@modules/lists/domain/dtos/ICreateListsDTO';
import IListsRepository from '@modules/lists/domain/repositories/IListsRepository';
import { getRepository, Repository } from 'typeorm';
import List from '../entities/List';

class ListsRepository implements IListsRepository {
  private ormRepository: Repository<List>;

  constructor() {
    this.ormRepository = getRepository(List);
  }

  public async create({
    title,
    description,
    materials_lists,
    provider_id,
  }: ICreateListsDTO): Promise<List> {
    const list = this.ormRepository.create({
      title,
      description,
      materials_lists,
      provider_id,
    });

    await this.ormRepository.save(list);

    return list;
  }

  public async findAllByProviderId(provider_id: string): Promise<List[]> {
    const lists = await this.ormRepository.find({
      where: { provider_id },
      relations: ['provider', 'materials_lists', 'materials_lists.material'],
    });

    return lists;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async index(): Promise<List[]> {
    const lists = await this.ormRepository.find({
      relations: ['provider', 'materials_lists', 'materials_lists.material'],
    });

    return lists;
  }
}

export default ListsRepository;
