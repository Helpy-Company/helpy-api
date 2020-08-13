import { inject, injectable } from 'tsyringe';
import Services from '@modules/workService/infra/typeorm/entities/Services';
import ServiceRepository from '@modules/workService/repositories/IServiceRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListUserService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: ServiceRepository,
  ) { }

  public async execute(user_id: string): Promise<Services[]> {
    const services = await this.serviceRepository.list(user_id);

    if (!services) {
      throw new AppError('This user does not have any service.');
    }

    return services;
  }
}

export default ListUserService;
