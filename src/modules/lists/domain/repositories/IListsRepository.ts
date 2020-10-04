import List from '@modules/lists/infra/typeorm/entities/List';
import ICreateListsDTO from '../dtos/ICreateListsDTO';

export default interface IListsRepository {
  create(data: ICreateListsDTO): Promise<List>;
  findAllByProviderId(id: string): Promise<List[]>;
}
