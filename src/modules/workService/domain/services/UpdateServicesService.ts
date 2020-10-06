import IContractorRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IServiceRepository from '../repositories/IServiceRepository';
import Service from '../../infra/typeorm/entities/Service';

interface IRequest {
  service_id: string;
  contractor_id: string;
  title?: string;
  intention?: string;
  address?: string;
  urgency?: string;
  service_category?: string;
  description?: string;
  CEP?: string;
  area?: string;
}

@injectable()
class UpdateServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('ContractorsRepository')
    private contractorRepository: IContractorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    contractor_id,
    service_id,
    address,
    urgency,
    title,
    service_category,
    intention,
    description,
    area,
    CEP,
  }: IRequest): Promise<Service> {
    const contractor = await this.contractorRepository.findById(contractor_id);

    if (!contractor) {
      throw new AppError('Contractor does not existis.');
    }

    const updatedService = await this.serviceRepository.findById(service_id);

    if (!updatedService) {
      throw new AppError('Service does not exists.');
    }

    updatedService.CEP = CEP || updatedService.CEP;
    updatedService.address = address || updatedService.address;
    updatedService.urgency = urgency || updatedService.urgency;
    updatedService.title = title || updatedService.title;
    updatedService.service_category =
      service_category || updatedService.service_category;
    updatedService.intention = intention || updatedService.intention;
    updatedService.description = description || updatedService.description;
    updatedService.area = area || updatedService.area;

    await this.serviceRepository.save(updatedService);

    await this.cacheProvider.invalidate(`services-list:${contractor.id}`);

    return updatedService;
  }
}

export default UpdateServicesService;
