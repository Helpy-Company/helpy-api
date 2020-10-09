import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import MaterialList from '@modules/materials/infra/typeorm/entities/MaterialList';

interface IRequest {
  provider_id: string;
}

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
class ListProviderListService {
  constructor(
    @inject('ListsRepository')
    private listRepository: ListsRepository,

    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute({ provider_id }: IRequest): Promise<IResponseDTO[]> {
    const provider = await this.providerRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists');
    }

    const lists = await this.listRepository.findAllByProviderId(provider_id);

    const formattedList = lists.map(list => {
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

    return formattedList;
  }
}

export default ListProviderListService;
