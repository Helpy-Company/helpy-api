import { getRepository, Repository } from 'typeorm';
import IMaterialRepository from '@modules/materials/domain/repositories/IMaterialRepository';
import ICreateMaterialDTO from '@modules/materials/domain/dtos/ICreateMaterialDTO';
import Material from '../entities/Material';

class MaterailListsRepository implements IMaterialRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async create({
    name,
    quantity,
  }: ICreateMaterialDTO): Promise<Material> {
    const material = this.ormRepository.create({
      name,
      quantity,
    });

    await this.ormRepository.save(material);

    return material;
  }

  public async findByIds(ids: string[]): Promise<Material[]> {
    const material = await this.ormRepository.findByIds(ids);

    return material;
  }
}

export default MaterailListsRepository;
