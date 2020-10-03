import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}
interface IResponseDTO {
  token: string;
  supplier: Supplier;
}

@injectable()
class AuthenticateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const supplier = await this.suppliersRepository.findByEmail(email);

    if (!supplier) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      supplier.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!supplier.verified_email) {
      throw new AppError('E-mail was not verified.', 401);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: supplier.id,
      expiresIn,
    });

    return {
      supplier,
      token,
    };
  }
}
export default AuthenticateSupplierService;
