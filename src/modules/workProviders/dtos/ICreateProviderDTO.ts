import ServiceCategory from '@modules/workService/infra/typeorm/entities/ServiceCategory';

export default interface ICreateCompaniesDTO {
  name: string;
  fantasyName: string;
  email: string;
  password: string;
  bio?: string;
  CEP: string;
  documentNumber: string;
  phone: string;
  service_categories: ServiceCategory[];
}
