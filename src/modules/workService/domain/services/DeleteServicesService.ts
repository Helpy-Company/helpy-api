import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IServiceRepository from '../repositories/IServiceRepository';

interface IRequest {
  service_id: string;
  contractor_id: string;
}

@injectable()
class DeleteServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ service_id, contractor_id }: IRequest): Promise<void> {
    const services = await this.serviceRepository.show();

    const deletedService = services.find(service => service.id === service_id);

    if (!deletedService) {
      throw new AppError('Service does not existis');
    }

    await this.cacheProvider.invalidate(`services-list:${contractor_id}`);

    await this.serviceRepository.deleteService({ service_id, contractor_id });
  }
}

export default DeleteServiceService;
