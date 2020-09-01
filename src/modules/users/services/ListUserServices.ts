import { inject, injectable } from 'tsyringe';
import Services from '@modules/workService/infra/typeorm/entities/Services';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListUserService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(user_id: string): Promise<Services[]> {
    let userServices = await this.cacheProvider.recover<Services[]>(
      `services-list:${user_id}`,
    );

    if (!userServices) {
      userServices = await this.serviceRepository.listUserService(user_id);
    }

    if (!userServices) {
      throw new AppError('This user does not have any service.');
    }

    await this.cacheProvider.save({
      key: `services-list:${user_id}`,
      value: classToClass(userServices),
    });

    return userServices;
  }
}

export default ListUserService;
