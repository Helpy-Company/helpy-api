import List from '@modules/lists/infra/typeorm/entities/List';
import { v4 as uuid } from 'uuid';
import IListsRepository from '../IListsRepository';

class FakeListsRepository implements IListsRepository {
  private lists: List[] = [];

  public async create(data: List): Promise<List> {
    const list = new List();

    Object.assign(list, { id: uuid() }, data);

    this.lists.push(list);

    return list;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.lists.findIndex(list => list.id === id);

    this.lists.splice(findIndex, 1);
  }

  public async findAllByProviderId(id: string): Promise<List[]> {
    const lists = this.lists.filter(list => list.provider_id === id);

    return lists;
  }

  public async index(): Promise<List[]> {
    return this.lists;
  }
}

export default FakeListsRepository;
