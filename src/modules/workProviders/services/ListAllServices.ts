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

  public async execute(company_id: string): Promise<Services[]> {
    const allServices = await this.serviceRepository.show();

    if (!allServices) {
      throw new AppError('There is no services available.');
    }

    return allServices;
  }
}

export default ListAllServices;
