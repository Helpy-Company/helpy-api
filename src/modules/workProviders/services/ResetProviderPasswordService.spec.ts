import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetProviderPasswordService';
import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
import FakeProvidersTokensRepository from '../repositories/fakes/FakeProvidersTokensRepository';

let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;
let fakeProvidersRepository: FakeProvidersRepository;
let fakeProvidersTokensRepository: FakeProvidersTokensRepository;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeProvidersTokensRepository = new FakeProvidersTokensRepository();
    fakeProvidersRepository = new FakeProvidersRepository();
    resetPasswordService = new ResetPasswordService(
      fakeHashProvider,
      fakeProvidersRepository,
      fakeProvidersTokensRepository
    );
  });

  it('should be able to reset password.', async () => {
    const provider = await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    const { token } = await fakeProvidersTokensRepository.generate(provider.id);

    const generateHash = await jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '12341234', token });

    const updateProvider = await fakeProvidersRepository.findById(provider.id);

    expect(generateHash).toHaveBeenCalledWith('12341234');
    expect(updateProvider?.password).toBe('12341234');
  });

  it('should be able to reset the password with non existing token.', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '12431234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing provider.', async () => {
    const { token } = await fakeProvidersTokensRepository.generate(
      'non-existing-provider-id'
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '12341234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than two hours.', async () => {
    const provider = await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '07178349131',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    const { token } = await fakeProvidersTokensRepository.generate(provider.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ password: '12341234', token })
    ).rejects.toBeInstanceOf(AppError);
  });
});
