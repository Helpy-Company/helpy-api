import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import FakeSupplierTokensRepository from '../repositories/fakes/FakeSupplierTokensRepository';
import CreateSuppliersService from './CreateSuppliersService';

let fakeSupplierRepository: FakeSupplierRepository;
let fakeSupplierTokensRepository: FakeSupplierTokensRepository;
let createSupplierService: CreateSuppliersService;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;

describe('Create Supplier', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
    fakeSupplierTokensRepository = new FakeSupplierTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    createSupplierService = new CreateSuppliersService(
      fakeSupplierRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeSupplierTokensRepository
    );
  });

  it('should be able to create as supplier', async () => {
    const supplier = await createSupplierService.execute({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    expect(supplier).toHaveProperty('id');
  });

  it('should not be able to create a supplier with the same documentNumber', async () => {
    await createSupplierService.execute({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    await expect(
      createSupplierService.execute({
        fantasyName: 'Loja do Jhon',
        email: 'johndoe@dmail.com',
        documentNumber: '22.819.745/0001-10',
        password: '1234',
        phone: '99999999',
        accept_terms: true,
        CEP: '74230010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a supplier with the same e-mail', async () => {
    await createSupplierService.execute({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    await expect(
      createSupplierService.execute({
        fantasyName: 'Loja do Jhon',
        email: 'johndoe@teste.com',
        documentNumber: '16.563.967/0001-11',
        password: '1234',
        phone: '99999999',
        accept_terms: true,
        CEP: '74230010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a supplier with invalid documentNumber', async () => {
    await expect(
      createSupplierService.execute({
        fantasyName: 'Loja do Jhon',
        email: 'johndoe@teste.com',
        documentNumber: '16.563.967/023465001-11',
        password: '1234',
        phone: '99999999',
        accept_terms: true,
        CEP: '74230010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a supplier with a invalid CEP', async () => {
    await expect(
      createSupplierService.execute({
        fantasyName: 'Loja do Jhon',
        email: 'johndoe@teste.com',
        documentNumber: '16.563.967/0001-11',
        password: '1234',
        phone: '99999999',
        accept_terms: true,
        CEP: '74230asdf010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a supplier with out accepting the terms and conditions', async () => {
    await expect(
      createSupplierService.execute({
        fantasyName: 'Loja do Jhon',
        email: 'johndoe@teste.com',
        documentNumber: '16.563.967/0001-11',
        password: '1234',
        phone: '99999999',
        accept_terms: false,
        CEP: '74230010',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
