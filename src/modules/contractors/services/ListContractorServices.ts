import { inject, injectable } from 'tsyringe';
import Services from '@modules/workService/infra/typeorm/entities/Services';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListContractorService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(contractor_id: string): Promise<Services[]> {
    let contractorServices = await this.cacheProvider.recover<Services[]>(
      `services-list:${contractor_id}`,
    );

    if (!contractorServices) {
      contractorServices = await this.serviceRepository.listContractorService(contractor_id);
    }

    if (!contractorServices) {
      throw new AppError('This contractor does not have any service.');
    }

    await this.cacheProvider.save({
      key: `services-list:${contractor_id}`,
      value: classToClass(contractorServices),
    });

    return contractorServices;
  }
}

export default ListContractorService;
