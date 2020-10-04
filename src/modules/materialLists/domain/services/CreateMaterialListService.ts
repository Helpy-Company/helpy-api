import MaterialList from '@modules/materialLists/infra/typeorm/entities/MaterialList';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Material from '@modules/materialLists/infra/typeorm/entities/Material';
import IMaterailListsResository from '../repositories/IMaterialListsRepository';
import IMaterialRepository from '../repositories/IMaterialRepository';

interface IRequestDTO {
  provider_id: string;
  material: Material;
}

@injectable()
class CreateMaterialListsService {
  constructor(
    @inject('MaterailListsRepository')
    private materialListsRepository: IMaterailListsResository,

    @inject('MaterialRepository')
    private materialRepository: IMaterialRepository,

    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository
  ) {}

  public async execute({
    material,
    provider_id,
  }: IRequestDTO): Promise<MaterialList> {
    const provider = await this.providersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exists');
    }

    const materialList = await this.materialListsRepository.create({
      provider_id,
      material,
    });

    return materialList;
  }
}

export default CreateMaterialListsService;
