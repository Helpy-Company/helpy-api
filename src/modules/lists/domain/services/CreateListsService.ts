import List from '@modules/lists/infra/typeorm/entities/List';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IMaterialsList } from '../dtos/ICreateListsDTO';
import IListsRepository from '../repositories/IListsRepository';

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
    private listRepository: IListsRepository,

    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute({
    title,
    description,
    materials_lists,
    provider_id,
  }: IRequest): Promise<List> {
    const provider = await this.providerRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists');
    }

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
