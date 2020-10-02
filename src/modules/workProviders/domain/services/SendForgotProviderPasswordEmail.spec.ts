import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeProvidersTokensRepository from '../repositories/fakes/FakeProvidersTokensRepository';
import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
import SendForgotProviderPasswordEmailService from './SendForgotProviderPasswordEmail';

let fakeProvidersRepository: FakeProvidersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeProvidersTokensRepository: FakeProvidersTokensRepository;
let sendForgotProviderPasswordEmailService: SendForgotProviderPasswordEmailService;

describe('SendForgotProviderPasswordEmail', () => {
  beforeEach(() => {
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeProvidersTokensRepository = new FakeProvidersTokensRepository();
    sendForgotProviderPasswordEmailService = new SendForgotProviderPasswordEmailService(
      fakeProvidersRepository,
      fakeMailProvider,
      fakeProvidersTokensRepository
    );
  });

  it('should be able to recover password using the email.', async () => {
    await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotProviderPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should generate a forgot password token.', async () => {
    const generateToken = jest.spyOn(fakeProvidersTokensRepository, 'generate');

    const provider = await fakeProvidersRepository.create({
      name: 'John Doe',
      CEP: '74230010',
      documentNumber: '418.472.130-30',
      fantasyName: 'Doe Inc.',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    await sendForgotProviderPasswordEmailService.execute({
      email: 'johndoe@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(provider.id);
  });
});
