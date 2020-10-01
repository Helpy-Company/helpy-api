import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeContractorsTokensRepository from '../repositories/fakes/FakeContractorsTokensRepository';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import SendForgotContractorPasswordEmailService from './SendForgotContractorPasswordEmailService';

let fakeContractorsRepository: FakeContractorsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeContractorsTokensRepository: FakeContractorsTokensRepository;
let sendForgotContractorPasswordEmailService: SendForgotContractorPasswordEmailService;

describe('SendForgotContractorPasswordEmail', () => {
  beforeEach(() => {
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeContractorsTokensRepository = new FakeContractorsTokensRepository();
    sendForgotContractorPasswordEmailService = new SendForgotContractorPasswordEmailService(
      fakeContractorsRepository,
      fakeMailProvider,
      fakeContractorsTokensRepository
    );
  });

  it('should be able to recover password using the email.', async () => {
    await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotContractorPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should generate a forgot password token.', async () => {
    const generateToken = jest.spyOn(
      fakeContractorsTokensRepository,
      'generate'
    );

    const contractor = await fakeContractorsRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    await sendForgotContractorPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(contractor.id);
  });
});
