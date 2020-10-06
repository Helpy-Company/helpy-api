import Material from '@modules/materials/infra/typeorm/entities/Material';

export default interface ICreateMaterialListDTO {
  provider_id: string;
  materials: Material[];
}
