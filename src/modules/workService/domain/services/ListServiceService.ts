import { inject, injectable } from 'tsyringe';
import Service from '../../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/IServiceRepository';

@injectable()
class ListServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(): Promise<Service[]> {
    const services = await this.serviceRepository.show();

    return services;
  }
}

export default ListServicesService;
