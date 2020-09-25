import ServiceCategory from '../infra/typeorm/entities/ServiceCategory';

export default interface IServiceCategoryRepository {
  index(): Promise<ServiceCategory[]>;
  findAllById(ids: string[]): Promise<ServiceCategory[]>;
}
