import Service from '../infra/typeorm/entities/Services';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  listUserService(user_id: string): Promise<Service[]>;
  show(): Promise<Service[]>;
  deleteService(id: string): Promise<void>
};
