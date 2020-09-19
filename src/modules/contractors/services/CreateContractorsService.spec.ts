import FakeHashProvider from '@shared/container/providers/HashProvider/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import CreateContractorService from './CreateContractorService';

let fakeContractorsRepository: FakeContractorsRepository;
let createContractor: CreateContractorService;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

describe('CreateContractor', () => {
  beforeEach(() => {
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeHashProvider = new FakeHashProvider();
    createContractor = new CreateContractorService(fakeContractorsRepository, fakeHashProvider, fakeMailProvider);
  });

  it('Should be able to create a new user.', async () => {
    const user = await createContractor.execute({
      name: 'Joao',
      email: 'joaozin@teste.com',
      phone: '99999999',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });
});
