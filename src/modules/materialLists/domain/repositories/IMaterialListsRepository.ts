import MaterialList from '@modules/materialLists/infra/typeorm/entities/MaterialList';
import ICreateMaterialListDTO from '../dtos/ICreateMaterialListDTO';

export default interface IMaterialListsRepository {
  create(data: ICreateMaterialListDTO): Promise<MaterialList>;
}
