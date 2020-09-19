export default interface ICreateServiceDTO {
  contractor_id: string;
  title: string;
  intention: string;
  address: string;
  urgency: string;
  service_category: string;
  description: string;
  CEP?: string;
  area: string
}
