import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRespository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ServiceRepository from '@modules/workService/infra/typeorm/repositories/ServiceRepository';

import ICategoryRepository from '@modules/workService/repositories/ICategoryRepository';
import CategoryRepository from '@modules/workService/infra/typeorm/repositories/CategoryRepository';

import IProviderRepository from '@modules/workProviders/repositories/IProviderRepository';
import ProvidersRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersRepository';

import IProviderTokensRepository from '@modules/workProviders/repositories/IProviderTokensRepository';
import ProvidersTokenRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProviderRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IProviderTokensRepository>(
  'ProvidersTokenRepository',
  ProvidersTokenRepository,
);

container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository,
);
container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
