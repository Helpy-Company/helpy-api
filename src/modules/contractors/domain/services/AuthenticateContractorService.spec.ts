import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import AuthenticateContractorService from './AuthenticateContractorService';

let fakeContractorsRepository: FakeContractorsRepository;
let authenticateContractorService: AuthenticateContractorService;
let fakeHashProvider: FakeHashProvider;

describe('AuthenticateContractor', () => {
  beforeEach(() => {
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateContractorService = new AuthenticateContractorService(
      fakeContractorsRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    Object.assign(contractor, {
      verified_email: true,
    });

    const response = await authenticateContractorService.execute({
      email: 'johndoe@teste.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.contractor).toEqual(contractor);
  });

  it('should not be able to authenticate with non existing users.', async () => {
    await expect(
      authenticateContractorService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    Object.assign(contractor, {
      verified_email: true,
    });

    expect(
      authenticateContractorService.execute({
        email: 'johndoe@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a non verified email.', async () => {
    await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    expect(
      authenticateContractorService.execute({
        email: 'johndoe@teste.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
