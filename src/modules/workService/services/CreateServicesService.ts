import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IContractorsRepository from '@modules/contractors/repositories/IContractorsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProviderRepository from '@modules/workProviders/repositories/IProviderRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import {
  isCEP,
} from 'brazilian-values';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import Services from '../infra/typeorm/entities/Services';
import IServiceRepository from '../repositories/IServiceRepository';

interface IRequestDTO {
  contractor_id: string;
  address: string;
  urgency: string;
  title: string;
  service_category: string;
  intention: string;
  description: string;
  CEP?: string;
  area: string;
}

@injectable()
class CreateServicesService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('ProvidersRepository')
    private providersRepository: IProviderRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) { }

  public async execute({
    contractor_id,
    address,
    urgency,
    title,
    service_category,
    intention,
    description,
    CEP,
    area,
  }: IRequestDTO): Promise<Services> {
    const contractorExists = await this.contractorsRepository.findById(contractor_id);

    if (!contractorExists) {
      throw new AppError('Contractor does not exist.');
    }

    if (CEP) {
      const isCep = isCEP(CEP);

      if (!isCep) {
        throw new AppError('CEP não encontrado.');
      }
    }

    const service = await this.serviceRepository.create({
      contractor_id: contractorExists.id,
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      CEP,
      area,
    });

    await this.cacheProvider.invalidate(`services-list:${contractorExists.id}`);

    const newServiceTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'service_creation_notify.hbs',
    );

    // const companies = await this.companiesRepository.index();

    // const companiesEmails = companies.map((company) => ({
    //   to: {
    //     email: company.email,
    //   },
    //   subject: '[Helpy] Novo serviço disponível!',
    //   templateData: {
    //     file: newServiceTemplate,
    //     variables: {
    //       link: `${process.env.APP_WEB_URL}`,
    //     },
    //   },
    // }));

    // await this.queueProvider.add(companiesEmails);

    // this.queueProvider.process(async (job) => this.mailProvider.sendMail(job.data));

    await this.mailProvider.sendMail({
      to: {
        email: 'helpycompany@gmail.com',
      },
      subject: '[helpy] Novo serviço disponível!',
      templateData: {
        file: newServiceTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}`,
          category: service.service_category,
          title: service.title,
        },
      },
    });

    return service;
  }
}

export default CreateServicesService;
