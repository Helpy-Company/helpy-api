import FakeContractorsRepository from '@modules/contractors/repositories/fakes/FakeContractorsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheRepository';
import AppError from '@shared/errors/AppError';
import FakeServiceRepository from '../repositories/fakes/FakeServiceRepository';
import DeleteServicesService from './DeleteServicesService';

let fakeServiceRepository: FakeServiceRepository;
let deleteServicesService: DeleteServicesService;
let fakeCacheProvider: FakeCacheProvider;
let fakeContractorsRepository: FakeContractorsRepository;

describe('DeleteService', () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServiceRepository();
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteServicesService = new DeleteServicesService(
      fakeServiceRepository,
      fakeCacheProvider
    );
  });

  it('should be able to delete a service.', async () => {
    const contractor = await fakeContractorsRepository.create({
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
      intention: 'Quero negociar o serviço com os profissionais',
      title: 'Reforma do barraco 2',
      service_category: 'CHAVEIRO',
      area: 'Sobrado',
      CEP: '74230010',
    });

    expect(
      deleteServicesService.execute({
        service_id: service.id,
        contractor_id: contractor.id,
      })
    ).toBeTruthy();
  });

  it('should not be able to delete an nonexistent service.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });
    await expect(
      deleteServicesService.execute({
        service_id: 'non-existent-service-id',
        contractor_id: contractor.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
