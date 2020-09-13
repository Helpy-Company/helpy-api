import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import {
  isCEP,
} from 'brazilian-values';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import queue from '@config/queue';
import Services from '../infra/typeorm/entities/Services';
import IServiceRepository from '../repositories/IServiceRepository';

interface IRequestDTO {
  user_id: string;
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
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

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
    user_id,
    address,
    urgency,
    title,
    service_category,
    intention,
    description,
    CEP,
    area,
  }: IRequestDTO): Promise<Services> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User does not exist.');
    }

    if (CEP) {
      const isCep = isCEP(CEP);

      if (!isCep) {
        throw new AppError('CEP não encontrado.');
      }
    }

    const service = await this.serviceRepository.create({
      user_id: userExists.id,
      address,
      urgency,
      title,
      service_category,
      intention,
      description,
      CEP,
      area,
    });

    await this.cacheProvider.invalidate(`services-list:${userExists.id}`);

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
      subject: '[Helpy] Novo serviço disponível!',
      templateData: {
        file: newServiceTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}`,
        },
      },
    });

    return service;
  }
}

export default CreateServicesService;
