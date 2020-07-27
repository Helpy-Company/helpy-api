import { getRepository } from 'typeorm';
import Services from '@entities/Services';
import AppError from '../errors/AppError';

class ListUserService {
  public async execute(id: string): Promise<Services[]> {
    const serviceRepository = getRepository(Services);

    const services = await serviceRepository.find({ where: { user_id: id } });

    if (!services) {
      throw new AppError('You dont have any services yet.');
    }

    return services;
  }
}

export default ListUserService;
