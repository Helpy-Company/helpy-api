import { getRepository, Repository } from 'typeorm';
import IMaterialListsRepository from '@modules/materialLists/domain/repositories/IMaterialListsRepository';
import ICreateMaterialListDTO from '@modules/materialLists/domain/dtos/ICreateMaterialListDTO';
import MaterialList from '../entities/MaterialList';

class MaterailListsRepository implements IMaterialListsRepository {
  private ormRepository: Repository<MaterialList>;

  constructor() {
    this.ormRepository = getRepository(MaterialList);
  }

  public async create({
    provider_id,
    material,
  }: ICreateMaterialListDTO): Promise<MaterialList> {
    const materialList = this.ormRepository.create({
      provider_id,
      material,
    });

    await this.ormRepository.save(materialList);

    return materialList;
  }
}

export default MaterailListsRepository;
