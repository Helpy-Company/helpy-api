import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeSupplierTokensRepository from '../repositories/fakes/FakeSupplierTokensRepository';
import FakeSupplierRepository from '../repositories/fakes/FakeSupplierRepository';
import SendForgotSupplierPasswordEmailService from './SendForgotSupplierPasswordEmailService';

let fakeSupplierRepository: FakeSupplierRepository;
let fakeMailProvider: FakeMailProvider;
let fakeSupplierTokensRepository: FakeSupplierTokensRepository;
let sendForgotSupplierPasswordEmailService: SendForgotSupplierPasswordEmailService;

describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeSupplierTokensRepository = new FakeSupplierTokensRepository();
    sendForgotSupplierPasswordEmailService = new SendForgotSupplierPasswordEmailService(
      fakeSupplierRepository,
      fakeMailProvider,
      fakeSupplierTokensRepository
    );
  });

  it('should be able to recover password using the email.', async () => {
    await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotSupplierPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('should generate a forgot password token.', async () => {
    const generateToken = jest.spyOn(fakeSupplierTokensRepository, 'generate');

    const supplier = await fakeSupplierRepository.create({
      fantasyName: 'Loja do Jhon',
      email: 'johndoe@teste.com',
      documentNumber: '22.819.745/0001-10',
      password: '1234',
      phone: '99999999',
      accept_terms: true,
      CEP: '74230010',
    });

    await sendForgotSupplierPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(supplier.id);
  });
});
