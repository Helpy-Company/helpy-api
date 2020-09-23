import AppError from '@shared/errors/AppError';
import FakeContractorRepository from '../repositories/fakes/FakeContractorsRepository';
import FakeContractorsTokensRepository from '../repositories/fakes/FakeContractorsTokensRepository';
import VerifyContractorEmailService from './VerifyContractorEmailService';

let fakeContractorsRepository: FakeContractorRepository;
let fakeContractorsTokensRepository: FakeContractorsTokensRepository;
let verifyContractorEmailService: VerifyContractorEmailService;

describe('VerifyContractorEmailService', () => {
  beforeEach(() => {
    fakeContractorsRepository = new FakeContractorRepository();
    fakeContractorsTokensRepository = new FakeContractorsTokensRepository();
    verifyContractorEmailService = new VerifyContractorEmailService(
      fakeContractorsRepository,
      fakeContractorsTokensRepository
    );
  });

  it('should not be able to verify an email.', async () => {
    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    const { token } = await fakeContractorsTokensRepository.generate(
      contractor.id
    );

    await verifyContractorEmailService.execute(token);

    expect(contractor.verified_email).toBe(true);
  });

  it('should not be able to verify email of nonexistent contractor.', async () => {
    await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
    });

    const { token } = await fakeContractorsTokensRepository.generate(
      'nonexistent_id'
    );

    await expect(
      verifyContractorEmailService.execute(token)
    ).rejects.toBeInstanceOf(AppError);
  });
});
