import { container } from 'tsyringe';

import './providers';

import IContractorsRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import ContractorsRepository from '@modules/contractors/infra/typeorm/repositories/ContractorsRespository';

import IContractorsTokensRepository from '@modules/contractors/domain/repositories/IContractorsTokensRepository';
import ContractorsTokensRepository from '@modules/contractors/infra/typeorm/repositories/ContractorsTokensRepository';

import IServiceRepository from '@modules/workService/domain/repositories/IServiceRepository';
import ServiceRepository from '@modules/workService/infra/typeorm/repositories/ServiceRepository';

import ICategoryRepository from '@modules/workService/domain/repositories/ICategoryRepository';
import CategoryRepository from '@modules/workService/infra/typeorm/repositories/CategoryRepository';

import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';
import ProvidersRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersRepository';

import IProviderTokensRepository from '@modules/workProviders/domain/repositories/IProviderTokensRepository';
import ProvidersTokenRepository from '@modules/workProviders/infra/typeorm/repositories/ProvidersTokenRepository';

import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

import ISupplierTokensRepository from '@modules/suppliers/domain/repositories/ISuppliersTokensRepository';
import SuppliersTokensRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersTokensRepository';

import IMaterialRepository from '@modules/materials/domain/repositories/IMaterialRepository';
import MaterialRepository from '@modules/materials/infra/typeorm/repositories/MaterialRepository';

import IListsRepository from '@modules/lists/domain/repositories/IListsRepository';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';

container.registerSingleton<IContractorsRepository>(
  'ContractorsRepository',
  ContractorsRepository
);

container.registerSingleton<IProviderRepository>(
  'ProvidersRepository',
  ProvidersRepository
);

container.registerSingleton<IContractorsTokensRepository>(
  'ContractorsTokensRepository',
  ContractorsTokensRepository
);

container.registerSingleton<IProviderTokensRepository>(
  'ProvidersTokenRepository',
  ProvidersTokenRepository
);

container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository
);

container.registerSingleton<ISupplierTokensRepository>(
  'SuppliersTokensRepository',
  SuppliersTokensRepository
);

container.registerSingleton<IListsRepository>(
  'ListsRepository',
  ListsRepository
);

container.registerSingleton<IMaterialRepository>(
  'MaterialRepository',
  MaterialRepository
);
