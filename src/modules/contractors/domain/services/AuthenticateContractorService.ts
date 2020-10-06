import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IContractorsRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import Contractor from '@modules/contractors/infra/typeorm/entities/Contractor';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}
interface IResponseDTO {
  token: string;
  contractor: Contractor;
}

@injectable()
class AuthenticateContractorService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const contractor = await this.contractorsRepository.findByEmail(email);

    if (!contractor) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      contractor.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!contractor.verified_email) {
      throw new AppError('E-mail was not verified.', 401);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: contractor.id,
      expiresIn,
    });

    return {
      contractor,
      token,
    };
  }
}
export default AuthenticateContractorService;
