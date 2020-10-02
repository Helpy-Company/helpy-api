import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetContractorPasswordService';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import FakeContractorsTokensRepository from '../repositories/fakes/FakeContractorsTokensRepository';

let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;
let fakeContractorsRepository: FakeContractorsRepository;
let fakeContractorsTokensRepository: FakeContractorsTokensRepository;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeContractorsTokensRepository = new FakeContractorsTokensRepository();
    fakeContractorsRepository = new FakeContractorsRepository();
    resetPasswordService = new ResetPasswordService(
      fakeContractorsRepository,
      fakeContractorsTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset password.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const { token } = await fakeContractorsTokensRepository.generate(
      contractor.id
    );

    const generateHash = await jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '12341234', token });

    const updateContractor = await fakeContractorsRepository.findById(
      contractor.id
    );

    expect(generateHash).toHaveBeenCalledWith('12341234');
    expect(updateContractor?.password).toBe('12341234');
  });

  it('should be able to reset the password with non existing token.', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '12431234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing contractor.', async () => {
    const { token } = await fakeContractorsTokensRepository.generate(
      'non-existing-contractor-id'
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '12341234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than two hours.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const { token } = await fakeContractorsTokensRepository.generate(
      contractor.id
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ password: '12341234', token })
    ).rejects.toBeInstanceOf(AppError);
  });
});
