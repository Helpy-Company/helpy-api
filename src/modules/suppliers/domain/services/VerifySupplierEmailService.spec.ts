import AppError from '@shared/errors/AppError';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import FakeSupplierTokensRepository from '../repositories/fakes/FakeSupplierTokensRepository';
import VerifySupplierEmailService from './VerifySupplierEmailService';

let fakeSupplierRepository: FakeSupplierRepository;
let fakeSupplierTokensRepository: FakeSupplierTokensRepository;
let verifySupplierEmailService: VerifySupplierEmailService;

describe('VerifySupplierEmailService', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
    fakeSupplierTokensRepository = new FakeSupplierTokensRepository();
    verifySupplierEmailService = new VerifySupplierEmailService(
      fakeSupplierRepository,
      fakeSupplierTokensRepository
    );
  });

  it('should be able to verify an email.', async () => {
    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });
    const { token } = await fakeSupplierTokensRepository.generate(supplier.id);

    await verifySupplierEmailService.execute(token);

    expect(supplier.verified_email).toBe(true);
  });

  it('should not be able to verify email of nonexistent contractor.', async () => {
    await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    const { token } = await fakeSupplierTokensRepository.generate(
      'non-existing-token'
    );

    await expect(
      verifySupplierEmailService.execute(token)
    ).rejects.toBeInstanceOf(AppError);
  });
});
