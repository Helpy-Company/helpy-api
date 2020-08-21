import Service from '../infra/typeorm/entities/Services';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  list(user_id: string): Promise<Service[]>;
  show(): Promise<Service[]>;
};
