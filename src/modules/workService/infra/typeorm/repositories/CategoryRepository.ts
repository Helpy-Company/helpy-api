import { getRepository, Repository } from 'typeorm';

import ICategoryRepository from '@modules/workService/repositories/ICategoryRepository';

import ServiceCategory from '@modules/workService/infra/typeorm/entities/ServiceCategory';

class ServiceRepository implements ICategoryRepository {
  private ormRepository: Repository<ServiceCategory>;

  constructor() {
    this.ormRepository = getRepository(ServiceCategory);
  }

  public async index(): Promise<ServiceCategory[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findAllById(ids: string[]): Promise<ServiceCategory[]> {
    const categories = await this.ormRepository.findByIds(ids);

    return categories;
  }
}

export default ServiceRepository;
