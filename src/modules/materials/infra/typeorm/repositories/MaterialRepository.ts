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
    description,
    quantity,
  }: ICreateMaterialDTO): Promise<Material> {
    const material = this.ormRepository.create({
      description,
      quantity,
    });

    await this.ormRepository.save(material);

    return material;
  }

  public async findById(id: string): Promise<Material | undefined> {
    const material = await this.ormRepository.findOne({ where: { id } });
    return material;
  }

  public async save(material: Material): Promise<Material> {
    return this.ormRepository.save(material);
  }

  public async delete(material: Material): Promise<void> {
    await this.ormRepository.delete(material.id);
  }
}

export default MaterailListsRepository;
