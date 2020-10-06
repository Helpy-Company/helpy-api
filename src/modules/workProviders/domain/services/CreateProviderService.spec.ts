import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
import FakeProvidersTokenRepository from '../repositories/fakes/FakeProvidersTokensRepository';
import CreateProviderService from './CreateProviderService';

let fakeProvidersRepository: FakeProvidersRepository;
let createProvider: CreateProviderService;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let fakeProviderTokenRepository: FakeProvidersTokenRepository;

describe('CreateProvider', () => {
  beforeEach(() => {
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeProviderTokenRepository = new FakeProvidersTokenRepository();
    fakeMailProvider = new FakeMailProvider();
    createProvider = new CreateProviderService(
      fakeProvidersRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeProviderTokenRepository
    );
  });

  it('Should be able to create a new provider.', async () => {
    const provider = await createProvider.execute({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    expect(provider).toHaveProperty('id');
  });

  it('Should not be able to create a new provider with a same e-mail from another.', async () => {
    await createProvider.execute({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    await expect(
      createProvider.execute({
        name: 'John Doe',
        CEP: '74230010',
        documentNumber: '418.472.130-30',
        fantasyName: 'Doe Inc.',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a provider with wrong document number.', async () => {
    await expect(
      createProvider.execute({
        name: 'John Doe',
        CEP: '74230010',
        documentNumber: 'non-existing-document-number',
        fantasyName: 'Doe Inc.',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a provider with wrong document number.', async () => {
    await expect(
      createProvider.execute({
        name: 'John Doe',
        CEP: 'non-existing-cep',
        documentNumber: '418.472.130-30',
        fantasyName: 'Doe Inc.',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a provider without accept the terms of use', async () => {
    await expect(
      createProvider.execute({
        name: 'John Doe',
        CEP: '74230010',
        documentNumber: '07178349131',
        fantasyName: 'Doe Inc.',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: false,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
