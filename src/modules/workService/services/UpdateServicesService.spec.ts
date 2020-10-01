import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeContractorRepository from '@modules/contractors/repositories/fakes/FakeContractorsRepository';
import UpdateServicesService from './UpdateServicesService';
import FakeServiceRepository from '../repositories/fakes/FakeServiceRepository';

let fakeContractorRepository: FakeContractorRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeUpdateService: UpdateServicesService;
let fakeServiceRepository: FakeServiceRepository;

describe('Update Service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeServiceRepository = new FakeServiceRepository();
    fakeContractorRepository = new FakeContractorRepository();
    fakeUpdateService = new UpdateServicesService(
      fakeServiceRepository,
      fakeContractorRepository,
      fakeCacheProvider
    );
  });

  it('should be able to update a service.', async () => {
    const contractor = await fakeContractorRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    const service = await fakeServiceRepository.create({
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

    const updatedService = await fakeUpdateService.execute({
      service_id: service.id,
      contractor_id: contractor.id,
      address: 'Rua 15, Av-Nada a ver',
      description:
        'Quero reformar o barraco e deixar ele gigante para fazer uma festa la no meu barraco gigante',
      urgency: 'Urgente',
      intention: 'Quero negoviar o serviço com os profissionais',
      title: 'Reforma do barraco 3',
      service_category: 'CHAVEIRO',
      area: 'Sobrado',
      CEP: '74230010',
    });

    expect(updatedService.title).toBe('Reforma do barraco 3');
  });
});
