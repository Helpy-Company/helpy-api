import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
import AuthenticateProviderService from './AuthenticateProviderService';

let fakeProvidersRepository: FakeProvidersRepository;
let authenticateProviderService: AuthenticateProviderService;
let fakeHashProvider: FakeHashProvider;

describe('AuthenticateProvider', () => {
  beforeEach(() => {
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateProviderService = new AuthenticateProviderService(
      fakeProvidersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate.', async () => {
    const provider = await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    Object.assign(provider, {
      verified_email: true,
    });

    const response = await authenticateProviderService.execute({
      email: 'johndoe@teste.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.provider).toEqual(provider);
  });

  it('should not be able to authenticate with non existing users.', async () => {
    await expect(
      authenticateProviderService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    const provider = await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    Object.assign(provider, {
      verified_email: true,
    });

    expect(
      authenticateProviderService.execute({
        email: 'johndoe@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a non verified email.', async () => {
    await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    expect(
      authenticateProviderService.execute({
        email: 'johndoe@teste.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
