import Material from '@modules/materialLists/infra/typeorm/entities/Material';

export default interface ICreateMaterialListDTO {
  provider_id: string;
  material: Material;
}
