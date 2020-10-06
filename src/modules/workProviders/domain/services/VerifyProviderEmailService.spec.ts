import AppError from '@shared/errors/AppError';
import FakeProviderRepository from '../repositories/fakes/FakeProvidersRepository';
import FakeProvidersTokensRepository from '../repositories/fakes/FakeProvidersTokensRepository';
import VerifyProviderEmailService from './VerifyProviderEmailService';

let fakeProvidersRepository: FakeProviderRepository;
let fakeProvidersTokensRepository: FakeProvidersTokensRepository;
let verifyProviderEmailService: VerifyProviderEmailService;

describe('VerifyProviderEmailService', () => {
  beforeEach(() => {
    fakeProvidersRepository = new FakeProviderRepository();
    fakeProvidersTokensRepository = new FakeProvidersTokensRepository();
    verifyProviderEmailService = new VerifyProviderEmailService(
      fakeProvidersRepository,
      fakeProvidersTokensRepository
    );
  });

  it('should not be able to verify an email.', async () => {
    const provider = await fakeProvidersRepository.create({
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

    const { token } = await fakeProvidersTokensRepository.generate(provider.id);

    await verifyProviderEmailService.execute(token);

    expect(provider.verified_email).toBe(true);
  });

  it('should not be able to verify email of nonexistent provider.', async () => {
    await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const { token } = await fakeProvidersTokensRepository.generate(
      'nonexistent_id'
    );

    await expect(
      verifyProviderEmailService.execute(token)
    ).rejects.toBeInstanceOf(AppError);
  });
});
