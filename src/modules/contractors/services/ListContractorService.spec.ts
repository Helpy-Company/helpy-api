import Service from '@modules/workService/infra/typeorm/entities/Service';
import FakeServiceRepository from '@modules/workService/repositories/fakes/FakeServiceRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import FakeContractorsTokenRepository from '../repositories/fakes/FakeContractorsTokensRepository';
import CreateContractorService from './CreateContractorService';
import ListContractorService from './ListContractorServices';

let fakeServiceRepository: FakeServiceRepository;
let fakeCacheProvider: FakeCacheProvider;
let listContractorsServices: ListContractorService;
let fakeContractorsRepository: FakeContractorsRepository;
let createContractor: CreateContractorService;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let fakeContractorTokenRepository: FakeContractorsTokenRepository;

describe('ListContractor', () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServiceRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listContractorsServices = new ListContractorService(
      fakeServiceRepository,
      fakeCacheProvider
    );

    fakeContractorsRepository = new FakeContractorsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeContractorTokenRepository = new FakeContractorsTokenRepository();
    fakeMailProvider = new FakeMailProvider();
    createContractor = new CreateContractorService(
      fakeContractorsRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeContractorTokenRepository
    );
  });

  it('should be able to list services.', async () => {
    const contractor = await createContractor.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    await fakeServiceRepository.create({
      address: 'Rua 15, Av-Nada a ver',
      description:
        'Quero reformar o barraco e deixar ele gigante para fazer uma festa la no meu barraco gigante',
      urgency: 'Urgente',
      intention: 'Quero negoviar o serviço com os profissionais',
      title: 'Reforma do barraco 2',
      service_category: 'CHAVEIRO',
      area: 'Sobrado',
      CEP: '74230010',
      contractor_id: contractor.id,
    });

    const response = await listContractorsServices.execute(contractor.id);

    expect(response[0]).toBeInstanceOf(Service);
  });
});
