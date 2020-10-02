import { inject, injectable } from 'tsyringe';

import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IContractorsRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IContractorsTokensRepository from '@modules/contractors/domain/repositories/IContractorsTokensRepository';

interface IRequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetContractorPasswordService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('ContractorsTokensRepository')
    private contractorsTokensRepository: IContractorsTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ password, token }: IRequestDTO): Promise<void> {
    const contractorToken = await this.contractorsTokensRepository.findByToken(
      token
    );

    if (!contractorToken) {
      throw new AppError('Contractors does not exists');
    }

    const contractor = await this.contractorsRepository.findById(
      contractorToken.contractor_id
    );

    if (!contractor) {
      throw new AppError('Contractors does not exists');
    }

    const tokenCreateAt = contractorToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    contractor.password = await this.hashProvider.generateHash(password);

    await this.contractorsRepository.save(contractor);
  }
}

export default ResetContractorPasswordService;
