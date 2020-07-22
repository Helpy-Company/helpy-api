import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  phone: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    phone,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
