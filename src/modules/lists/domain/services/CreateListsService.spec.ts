import FakeProvidersRepository from '@modules/workProviders/domain/repositories/fakes/FakeProvidersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '../repositories/fakes/FakeListsRepository';
import CreateListsService from './CreateListsService';

let providersRepository: FakeProvidersRepository;
let listsRepository: FakeListsRepository;
let createListsService: CreateListsService;
let fakeCacheProvider: FakeCacheProvider;

describe('Create Lists', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository();
    listsRepository = new FakeListsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createListsService = new CreateListsService(
      listsRepository,
      providersRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a list', async () => {
    const provider = await providersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const list = await createListsService.execute({
      provider_id: provider.id,
      description: 'description',
      title: 'title',
      materials_lists: [],
    });

    expect(list).toHaveProperty('id');
  });

  it('should not be able to create a list with no existent provider', async () => {
    await expect(
      createListsService.execute({
        provider_id: 'non-exixtent-id',
        description: 'description',
        title: 'title',
        materials_lists: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
