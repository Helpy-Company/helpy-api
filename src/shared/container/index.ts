import { container } from 'tsyringe';

import './providers';

import IContractorsRepository from '@modules/contractors/repositories/IContractorsRepository';
import ContractorsRepository from '@modules/contractors/infra/typeorm/repositories/ContractorsRespository';

import IContractorsTokensRepository from '@modules/contractors/repositories/IContractorsTokensRepository';
import ContractorsTokensRepository from '@modules/contractors/infra/typeorm/repositories/ContractorsTokensRepository';

import IServiceRepository from '@modules/workService/repositories/IServiceRepository';
import ServiceRepository from '@modules/workService/infra/typeorm/repositories/ServiceRepository';

import ICategoryRepository from '@modules/workService/repositories/ICategoryRepository';
import CategoryRepository from '@modules/workService/infra/typeorm/repositories/CategoryRepository';

import IProviderRepository from '@modules/workProviders/repositories/IProviderRepository';
import ProvidersRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersRepository';

import IProviderTokensRepository from '@modules/workProviders/repositories/IProviderTokensRepository';
import ProvidersTokenRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersTokenRepository';

container.registerSingleton<IContractorsRepository>(
  'ContractorsRepository',
  ContractorsRepository,
);

container.registerSingleton<IProviderRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IContractorsTokensRepository>(
  'ContractorsTokensRepository',
  ContractorsTokensRepository,
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
