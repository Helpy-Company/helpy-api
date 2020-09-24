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
    });

    const { token } = await fakeProvidersTokensRepository.generate(
      'nonexistent_id'
    );

    await expect(
      verifyProviderEmailService.execute(token)
    ).rejects.toBeInstanceOf(AppError);
  });
});
