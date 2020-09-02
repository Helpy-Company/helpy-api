import { inject, injectable } from 'tsyringe';
import Services from '@modules/workService/infra/typeorm/entities/Services';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListAllServices {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(company_id: string): Promise<Services[]> {
    let allServices = await this.cacheProvider.recover<Services[]>(
      `services-list:${company_id}`,
    );

    if (!allServices) {
      allServices = await this.serviceRepository.show();
    }

    if (!allServices) {
      throw new AppError('There is no services available.');
    }

    await this.cacheProvider.save({
      key: `services-list:${company_id}`,
      value: classToClass(allServices),
    });

    return allServices;
  }
}

export default ListAllServices;
