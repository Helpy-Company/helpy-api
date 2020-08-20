import { getRepository, Repository } from 'typeorm';

import IServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ICreateServiceDTO from '@modules/workService/dtos/ICreateServiceDTO';

import Service from '@modules/workService/infra/typeorm/entities/Services';

class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create({
    user_id, title, filters, description, service_category,
  }: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create({
      user_id, title, filters, description, service_category,
    });

    await this.ormRepository.save(service);

    return service;
  }

  public async list(user_id: string): Promise<Service[]> {
    const services = await this.ormRepository.find({ where: { user_id } });

    return services;
  }

  public async show(): Promise<Service[]> {
    const services = await this.ormRepository.find();

    return services;
  }
}

export default ServiceRepository;
