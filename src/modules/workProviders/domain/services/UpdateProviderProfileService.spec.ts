import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeProviderRepository from '../repositories/fakes/FakeProvidersRepository';
import UpdateProviderProfileService from './UpdateProviderProfileService';

let fakeProviderRepository: FakeProviderRepository;
let updateProviderProfileService: UpdateProviderProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProviderProfile', () => {
  beforeEach(() => {
    fakeProviderRepository = new FakeProviderRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeHashProvider = new FakeHashProvider();
    updateProviderProfileService = new UpdateProviderProfileService(
      fakeProviderRepository,
      fakeHashProvider
    );
  });

  it('should be able to update profile.', async () => {
    const provider = await fakeProviderRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
      service_categories: [
        {
          id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
          title: 'ARQUITETO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
          title: 'DECORADOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    const updatedProvider = await updateProviderProfileService.execute({
      provider_id: provider.id,
      name: 'John Tré',
      CEP: '74595-170',
      documentNumber: '48.499.434/0001-04',
      fantasyName: 'Doe CO.',
      email: 'johntre@teste.com',
      phone: '99999989',
    });

    expect(updatedProvider.name).toBe('John Tré');
    expect(updatedProvider.email).toBe('johntre@teste.com');
    expect(updatedProvider.CEP).toBe('74595-170');
    expect(updatedProvider.documentNumber).toBe('48.499.434/0001-04');
    expect(updatedProvider.fantasyName).toBe('Doe CO.');
    expect(updatedProvider.phone).toBe('99999989');
  });

  it('should not be able to update the profile from non-existing provider.', async () => {
    expect(
      updateProviderProfileService.execute({
        provider_id: 'non-exisitng-provider-id',
        name: 'John Tré',
        CEP: '74595-170',
        documentNumber: '48.499.434/0001-04',
        fantasyName: 'Doe CO.',
        email: 'johntre@teste.com',
        phone: '99999989',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another provider e-mail', async () => {
    await fakeProviderRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
      service_categories: [
        {
          id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
          title: 'ARQUITETO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
          title: 'DECORADOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    const provider = await fakeProviderRepository.create({
      name: 'John Tre',
      CEP: '74230010',
      documentNumber: '623.460.360-21',
      fantasyName: 'Doe Inc.',
      email: 'johntre@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
      service_categories: [
        {
          id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
          title: 'ARQUITETO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
          title: 'DECORADOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await expect(
      updateProviderProfileService.execute({
        provider_id: provider.id,
        name: 'John Tre',
        email: 'johndoe@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password.', async () => {
    const provider = await fakeProviderRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      accept_terms: true,
      service_categories: [
        {
          id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
          title: 'ARQUITETO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
          title: 'DECORADOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      password: '1234',
    });

    await updateProviderProfileService.execute({
      provider_id: provider.id,
      name: 'John Tre',
      CEP: '74230010',
      documentNumber: '623.460.360-21',
      fantasyName: 'Doe Inc.',
      email: 'johntre@teste.com',
      phone: '99999999',
      old_password: '1234',
      password: '12345',
    });

    expect(provider.password).toBe('12345');
  });

  it('should be able to update the password with wrong old password.', async () => {
    const provider = await fakeProviderRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
      service_categories: [
        {
          id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
          title: 'ARQUITETO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
          title: 'DECORADOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await expect(
      updateProviderProfileService.execute({
        provider_id: provider.id,
        name: 'John Tre',
        CEP: '74230010',
        documentNumber: '623.460.360-21',
        fantasyName: 'Doe Inc.',
        email: 'johntre@teste.com',
        phone: '99999999',
        old_password: '12345',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
