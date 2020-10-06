import Material from '@modules/materials/infra/typeorm/entities/Material';
import { uuid } from 'uuidv4';
import ICreateMaterialDTO from '../../dtos/ICreateMaterialDTO';
import IMaterialRepository from '../IMaterialRepository';

class FakeMaterialProvider implements IMaterialRepository {
  private materials: Material[] = [];

  public async create(data: ICreateMaterialDTO): Promise<Material> {
    const material = new Material();

    Object.assign(material, { id: uuid() }, data);

    this.materials.push(material);

    return material;
  }

  public async delete(material: Material): Promise<void> {
    const { id } = material;

    const findIndex = this.materials.findIndex(m => m.id === id);

    this.materials.splice(findIndex, 1);
  }

  public async save(material: Material): Promise<Material> {
    const findIndex = this.materials.findIndex(
      materialUpdate => materialUpdate.id === material.id
    );

    this.materials[findIndex] = material;

    return material;
  }

  public async findById(id: string): Promise<Material | undefined> {
    const material = this.materials.find(m => m.id === id);

    return material;
  }
}

export default FakeMaterialProvider;
