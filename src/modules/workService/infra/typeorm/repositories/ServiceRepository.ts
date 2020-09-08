import { getRepository, Repository } from 'typeorm';

import IServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ICreateServiceDTO from '@modules/workService/dtos/ICreateServiceDTO';

import Service from '@modules/workService/infra/typeorm/entities/Services';
import IDeleteServiceDTO from '@modules/workService/dtos/IDeleteServiceDTO';

class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create({
    address,
    urgency,
    title,
    service_category,
    intention,
    user_id,
    description,
    CEP,
  }: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create({
      address,
      urgency,
      title,
      service_category,
      intention,
      user_id,
      description,
      CEP,
    });

    await this.ormRepository.save(service);

    return service;
  }

  public async listUserService(user_id: string): Promise<Service[]> {
    const services = await this.ormRepository.find({ where: { user_id } });

    return services;
  }

  public async show(): Promise<Service[]> {
    const services = await this.ormRepository.find();

    return services;
  }

  public async deleteService({ service_id, user_id }: IDeleteServiceDTO): Promise<void> {
    await this.ormRepository.delete(service_id);
  }

  public async findServiceByCategory(category: string): Promise<Service[]> {
    const services = await this.ormRepository.find({ where: { service_category: category } });

    return services;
  }
}

export default ServiceRepository;
