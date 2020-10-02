import { getRepository, Repository } from 'typeorm';

import IServiceRepository from '@modules/workService/domain/repositories/IServiceRepository';
import ICreateServiceDTO from '@modules/workService/domain/dtos/ICreateServiceDTO';

import Service from '@modules/workService/infra/typeorm/entities/Service';
import IDeleteServiceDTO from '@modules/workService/domain/dtos/IDeleteServiceDTO';

class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create({
    address,
    urgency,
    title,
    service_category,
    intention,
    contractor_id,
    description,
    CEP,
    area,
  }: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create({
      address,
      urgency,
      title,
      service_category,
      intention,
      contractor_id,
      description,
      CEP,
      area,
    });

    await this.ormRepository.save(service);

    return service;
  }

  public async listContractorService(
    contractor_id: string
  ): Promise<Service[]> {
    const services = await this.ormRepository.find({
      where: { contractor_id },
    });

    return services;
  }

  public async show(): Promise<Service[]> {
    const services = await this.ormRepository.find();

    return services;
  }

  public async deleteService({
    service_id,
    contractor_id,
  }: IDeleteServiceDTO): Promise<void> {
    await this.ormRepository.delete(service_id);
  }

  public async findServiceByCategory(category: string): Promise<Service[]> {
    const services = await this.ormRepository.find({
      where: { service_category: category },
    });

    return services;
  }

  public async save(service: Service): Promise<Service> {
    return this.ormRepository.save(service);
  }

  public async findById(id: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(id);

    return service;
  }
}

export default ServiceRepository;
