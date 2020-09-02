import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import path from 'path';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

    await this.cacheProvider.invalidate(`services-list:${userExists.id}`);

    const companies = await this.companiesRepository.index();

    const newServiceTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'service_creation_notify.hbs',
    );

    // const companiesEmails = companies.map((company) => company.email);
    // const parsedCompaniesEmails = companiesEmails.join(',');

    // await this.mailProvider.sendMail({
    //   to: {
    //     email: parsedCompaniesEmails,
    //   },
    //   subject: '[Helpy] Novo serviço disponível!',
    //   templateData: {
    //     file: newServiceTemplate,
    //     variables: {
    //       link: `${process.env.APP_WEB_URL}`,
    //     },
    //   },
    // });

    return service;
  }
}

export default CreateServicesService;
