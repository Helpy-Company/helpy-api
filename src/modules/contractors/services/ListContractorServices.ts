import { inject, injectable } from 'tsyringe';
import Service from '@modules/workService/infra/typeorm/entities/Service';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListContractorService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute(contractor_id: string): Promise<Service[]> {
    let contractorService = await this.cacheProvider.recover<Service[]>(
      `services-list:${contractor_id}`
    );

    if (!contractorService) {
      contractorService = await this.serviceRepository.listContractorService(
        contractor_id
      );
    }

    await this.cacheProvider.save({
      key: `services-list:${contractor_id}`,
      value: classToClass(contractorService),
    });

    return contractorService;
  }
}

export default ListContractorService;
