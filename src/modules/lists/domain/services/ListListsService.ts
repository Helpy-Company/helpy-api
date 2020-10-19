import IListsRepository from '@modules/lists/domain/repositories/IListsRepository';
import { inject, injectable } from 'tsyringe';
import MaterialList from '@modules/materials/infra/typeorm/entities/MaterialList';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import List from '@modules/lists/infra/typeorm/entities/List';

interface IResponseDTO {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  provider: {
    id: string;
    name: string;
    fantasyName: string;
    phone: string;
    email: string;
  };
  materials_lists: MaterialList[];
}

@injectable()
class ListListsService {
  constructor(
    @inject('ListsRepository')
    private listRepository: IListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<IResponseDTO[]> {
    let lists: List[];
    let formattedList = await this.cacheProvider.recover<IResponseDTO[]>(
      `lists-list:no-auth`
    );

    if (!formattedList) {
      lists = await this.listRepository.index();
      formattedList = lists.map(list => {
        return {
          id: list.id,
          title: list.title,
          description: list.description,
          created_at: list.created_at,
          provider: {
            id: list.provider.id,
            name: list.provider.name,
            fantasyName: list.provider.fantasyName,
            phone: list.provider.phone,
            email: list.provider.email,
          },
          materials_lists: list.materials_lists,
        };
      });

      await this.cacheProvider.save({
        key: `lists-list:no-auth`,
        value: formattedList,
      });
    }

    return formattedList;
  }
}

export default ListListsService;
