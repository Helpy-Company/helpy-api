import { inject, injectable } from 'tsyringe';
import Service from '@modules/workService/infra/typeorm/entities/Service';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllServices {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository
  ) { }

  public async execute(company_id: string): Promise<Service[]> {
    const allServices = await this.serviceRepository.show();

    if (!allServices) {
      throw new AppError('There is no services available.');
    }

    return allServices;
  }
}

export default ListAllServices;
