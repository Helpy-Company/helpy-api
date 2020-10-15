import Material from '@modules/materials/infra/typeorm/entities/Material';
import { inject, injectable } from 'tsyringe';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';
import IMaterialRepository from '../repositories/IMaterialRepository';

@injectable()
class CreateMaterialsService {
  constructor(
    @inject('MaterialRepository')
    private materialRepository: IMaterialRepository
  ) {}

  public async execute({
    description,
    quantity,
  }: ICreateMaterialDTO): Promise<Material> {
    const material = await this.materialRepository.create({
      description,
      quantity,
    });

    return material;
  }
}

export default CreateMaterialsService;
