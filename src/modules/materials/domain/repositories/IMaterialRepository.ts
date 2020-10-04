import Material from '@modules/materials/infra/typeorm/entities/Material';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';

export default interface IMaterialRepository {
  create(data: ICreateMaterialDTO): Promise<Material>;
  findByIds(ids: string[]): Promise<Material[]>;
}
