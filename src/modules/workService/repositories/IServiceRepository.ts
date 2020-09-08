import Service from '../infra/typeorm/entities/Services';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import IDeleteServiceDTO from '../dtos/IDeleteServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  listUserService(user_id: string): Promise<Service[]>;
  show(): Promise<Service[]>;
  deleteService({ service_id, user_id }: IDeleteServiceDTO): Promise<void>;
  findServiceByCategory(category: string): Promise<Service[]>
};
