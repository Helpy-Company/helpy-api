import Material from '@modules/materials/infra/typeorm/entities/Material';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';

export default interface IMaterialRepository {
  create(data: ICreateMaterialDTO): Promise<Material>;
  findById(id: string): Promise<Material | undefined>;
  save(material: Material): Promise<Material>;
  delete(material: Material): Promise<void>;
}
