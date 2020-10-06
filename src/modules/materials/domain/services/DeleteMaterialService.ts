import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMaterialRepository from '../repositories/IMaterialRepository';

@injectable()
class DeleteMaterialService {
  constructor(
    @inject('MaterialRepository')
    private materialRepository: IMaterialRepository
  ) {}

  public async execute(material_id: string): Promise<void> {
    const material = await this.materialRepository.findById(material_id);

    if (!material) {
      throw new AppError('Material does not exists');
    }

    await this.materialRepository.delete(material);
  }
}

export default DeleteMaterialService;
