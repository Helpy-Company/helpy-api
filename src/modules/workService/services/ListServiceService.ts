import { inject, injectable } from 'tsyringe';
import Services from '../infra/typeorm/entities/Services';
import IServiceRepository from '../repositories/IServiceRepository';

@injectable()
class CreateServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) { }

  public async execute(): Promise<Services[]> {
    const services = await this.serviceRepository.show();

    return services;
  }
}

export default CreateServicesService;
