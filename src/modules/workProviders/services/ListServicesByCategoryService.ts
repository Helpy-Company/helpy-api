import { inject, injectable } from 'tsyringe';
import Services from '@modules/workService/infra/typeorm/entities/Services';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllServices {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,

  ) { }

  public async execute(category: string): Promise<Services[]> {
    const services = await this.serviceRepository.findServiceByCategory(category);
    if (!services) {
      throw new AppError('There is no services available.');
    }
    return services;
  }
}

export default ListAllServices;
