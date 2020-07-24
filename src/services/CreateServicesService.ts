import { getRepository } from 'typeorm';
import Services from '@entities/Services';
import User from '@entities/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  title: string;
  filters: string;
  description: string;
}

class CreateServicesService {
  public async execute({
    user_id,
    title,
    filters,
    description,
  }: RequestDTO): Promise<Services> {
    const servicesRepository = getRepository(Services);
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne(user_id);

    if (!userExists) {
      throw new AppError('User does not exist.');
    }

    const service = servicesRepository.create({
      user: userExists,
      description,
      filters,
      title,
    });

    await servicesRepository.save(service);

    return service;
  }
}

export default CreateServicesService;
