import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import AuthenticateSupplierService from './AuthenticateSupplierService';

let fakeHashProvider: FakeHashProvider;
let fakeSupplierRepository: FakeSupplierRepository;
let authenticateSupplierService: AuthenticateSupplierService;

describe('AuthenticaSupplierService', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeSupplierRepository = new FakeSupplierRepository();
    authenticateSupplierService = new AuthenticateSupplierService(
      fakeSupplierRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate a supplier', async () => {
    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    Object.assign(supplier, {
      verified_email: true,
    });

    const response = await authenticateSupplierService.execute({
      email: 'johndoe@teste.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.supplier).toEqual(supplier);
  });

  it('should not be able to authenticate with non existing users.', async () => {
    await expect(
      authenticateSupplierService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    Object.assign(supplier, {
      verified_email: true,
    });

    await expect(
      authenticateSupplierService.execute({
        email: 'johndoe@teste.com',
        password: '12321344',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with not verified email', async () => {
    await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    await expect(
      authenticateSupplierService.execute({
        email: 'johndoe@teste.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
