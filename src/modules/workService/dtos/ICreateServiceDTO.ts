export default interface ICreateServiceDTO {
  user_id: string;
  title: string;
  intention: string;
  address: string;
  urgency: string;
  service_category: string;
  description: string;
  CEP?: string;
  area: string
};
