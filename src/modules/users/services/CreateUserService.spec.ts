import FakeHashProvider from '@shared/container/providers/HashProvider/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserServices';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'Joao',
      email: 'joaozin@teste.com',
      phone: '99999999',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });
});
