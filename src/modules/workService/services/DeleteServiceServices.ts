import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IServiceRepository from '../repositories/IServiceRepository';

@injectable()
class DeleteServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) { }

  public async execute(id: string): Promise<void> {
    const services = await this.serviceRepository.show();

    const deletedService = services.find((service) => service.id === id);

    if (!deletedService) {
      throw new AppError('Service does not existis');
    }

    await this.serviceRepository.deleteService(deletedService.id);
  }
}

export default DeleteServiceService;
