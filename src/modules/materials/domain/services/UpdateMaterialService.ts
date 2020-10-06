import Material from '@modules/materials/infra/typeorm/entities/Material';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMaterialRepository from '../repositories/IMaterialRepository';

interface IRequestDTO {
  id: string;
  name: string;
  quantity: number;
}

@injectable()
class UpdateMaterialService {
  constructor(
    @inject('MaterialRepository')
    private materialRepository: IMaterialRepository
  ) {}

  public async execute({ id, name, quantity }: IRequestDTO): Promise<Material> {
    const material = await this.materialRepository.findById(id);

    if (!material) {
      throw new AppError('Material does not exists');
    }

    material.name = name || material.name;
    material.quantity = quantity || material.quantity;

    await this.materialRepository.save(material);

    return material;
  }
}

export default UpdateMaterialService;
