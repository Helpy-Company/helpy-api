import { getRepository } from 'typeorm';
import Services from '@entities/Services';

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

    const service = servicesRepository.create({
      user_id,
      title,
      filters,
      description,
    });

    await servicesRepository.save(service);

    return service;
  }
}

export default CreateServicesService;
