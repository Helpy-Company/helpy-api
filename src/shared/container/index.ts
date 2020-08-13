import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRespository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ServiceRepository from '@modules/workService/infra/typeorm/repositories/ServiceRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import ICompanyTokenRepository from '@modules/companies/repositories/ICompanyTokensRepository';
import CompaniesTokenRepository from '@modules/companies/infra/typeorm/repositories/CompaniesTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<ICompanyTokenRepository>(
  'CompaniesTokenRepository',
  CompaniesTokenRepository,
);

container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository,
);
