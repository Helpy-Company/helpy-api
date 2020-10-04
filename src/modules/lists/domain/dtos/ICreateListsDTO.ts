export interface IMaterialsList {
  material_id: string;
}

export default interface ICreateListsDTO {
  title: string;
  description: string;
  materials_lists: IMaterialsList[];
  provider_id: string;
}
