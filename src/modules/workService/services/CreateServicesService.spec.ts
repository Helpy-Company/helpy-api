import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeContractorsRepository from '@modules/contractors/repositories/fakes/FakeContractorsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProvidersRepository from '@modules/workProviders/repositories/fakes/FakeProvidersRepository';
import AppError from '@shared/errors/AppError';
import FakeServiceRepository from '../repositories/fakes/FakeServiceRepository';
import CreateServiceRepository from './CreateServicesService';

let fakeServiceRepository: FakeServiceRepository;
let createServiceRepository: CreateServiceRepository;
let fakeMailProvider: FakeMailProvider;
let fakeContractorsRepository: FakeContractorsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeProvidersRepository: FakeProvidersRepository;

describe('CreateService', () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServiceRepository();
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeMailProvider = new FakeMailProvider();
    fakeProvidersRepository = new FakeProvidersRepository();
    createServiceRepository = new CreateServiceRepository(
      fakeContractorsRepository,
      fakeProvidersRepository,
      fakeServiceRepository,
      fakeMailProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new service.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const service = await createServiceRepository.execute({
      contractor_id: contractor.id,
      address: 'Rua 15, Av-Nada a ver',
      description:
        'Quero reformar o barraco e deixar ele gigante para fazer uma festa la no meu barraco gigante',
      urgency: 'Urgente',
      intention: 'Quero negoviar o serviço com os profissionais',
      title: 'Reforma do barraco 2',
      service_category: 'CHAVEIRO',
      area: 'Sobrado',
      CEP: '74230010',
    });

    expect(service).toHaveProperty('id');
  });

  it('should not be able to create a service with non existent contractor', async () => {
    await expect(
      createServiceRepository.execute({
        contractor_id: 'non-existent-contractor-id',
        address: 'Rua 15, Av-Nada a ver',
        description:
          'Quero reformar o barraco e deixar ele gigante para fazer uma festa la no meu barraco gigante',
        urgency: 'Urgente',
        intention: 'Quero negoviar o serviço com os profissionais',
        title: 'Reforma do barraco 2',
        service_category: 'CHAVEIRO',
        area: 'Sobrado',
        CEP: '74230010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
