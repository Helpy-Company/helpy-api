import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Services from '../infra/typeorm/entities/Services';
import IServiceRepository from '../repositories/IServiceRepository';

interface IRequestDTO {
  user_id: string;
  title: string;
  filters: string;
  description: string;
  service_category: string;
}

@injectable()
class CreateServicesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) { }

  public async execute({
    user_id,
    title,
    filters,
    description,
    service_category,
  }: IRequestDTO): Promise<Services> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User does not exist.');
    }

    const service = await this.serviceRepository.create({
      user_id: userExists.id,
      description,
      filters,
      title,
      service_category,
    });

    return service;
  }
}

export default CreateServicesService;
