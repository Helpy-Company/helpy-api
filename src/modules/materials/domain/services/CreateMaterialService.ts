import Material from '@modules/materials/infra/typeorm/entities/Material';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';
import IMaterialRepository from '../repositories/IMaterialRepository';

@injectable()
class CreateMaterialsService {
  constructor(
    @inject('MaterialRepository')
    private materialRepository: IMaterialRepository,

    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository
  ) {}

  public async execute({
    name,
    quantity,
  }: ICreateMaterialDTO): Promise<Material> {
    const material = await this.materialRepository.create({
      name,
      quantity,
    });

    return material;
  }
}

export default CreateMaterialsService;
