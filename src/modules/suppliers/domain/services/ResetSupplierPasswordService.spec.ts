import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import FakeSupplierTokensRepository from '../repositories/fakes/FakeSupplierTokensRepository';
import ResetSupplierPasswordService from './ResetSupplierPasswordService';

let fakeSupplierRepository: FakeSupplierRepository;
let fakeSupplierTokenRepository: FakeSupplierTokensRepository;
let resetSupplierPassword: ResetSupplierPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Reset Suppliers Password', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeSupplierTokenRepository = new FakeSupplierTokensRepository();
    resetSupplierPassword = new ResetSupplierPasswordService(
      fakeSupplierRepository,
      fakeSupplierTokenRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset password.', async () => {
    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    const { token } = await fakeSupplierTokenRepository.generate(supplier.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetSupplierPassword.execute({ password: '12341234', token });

    const updateSupplier = await fakeSupplierRepository.findById(supplier.id);

    expect(generateHash).toHaveBeenCalledWith('12341234');
    expect(updateSupplier?.password).toBe('12341234');
  });

  it('should be able to reset the password with non existing token.', async () => {
    await expect(
      resetSupplierPassword.execute({
        token: 'non-existing-token',
        password: '12431234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing supplier.', async () => {
    const { token } = await fakeSupplierTokenRepository.generate(
      'non-existing-contractor-id'
    );

    await expect(
      resetSupplierPassword.execute({
        token,
        password: '12341234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than two hours.', async () => {
    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    const { token } = await fakeSupplierTokenRepository.generate(supplier.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetSupplierPassword.execute({ password: '12341234', token })
    ).rejects.toBeInstanceOf(AppError);
  });
});
