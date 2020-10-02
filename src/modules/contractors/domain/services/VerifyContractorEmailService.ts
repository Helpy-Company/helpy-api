import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractorsRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import IContractorsTokensRepository from '@modules/contractors/domain/repositories/IContractorsTokensRepository';

@injectable()
class VerifyContractorEmailService {
  constructor(
    @inject('ContractorsRepository')
    private contractorsRepository: IContractorsRepository,

    @inject('ContractorsTokensRepository')
    private contractorsTokensRepository: IContractorsTokensRepository
  ) {}

  public async execute(token: string): Promise<void> {
    const contractorToken = await this.contractorsTokensRepository.findByToken(
      token
    );

    if (!contractorToken) {
      throw new AppError('Contractor token does not exists');
    }

    const contractor = await this.contractorsRepository.findById(
      contractorToken.contractor_id
    );

    if (!contractor) {
      throw new AppError('Contractor does not exists');
    }

    if (!(contractorToken.contractor_id === contractor.id)) {
      throw new AppError('Invalid token');
    }

    contractor.verified_email = true;

    await this.contractorsRepository.save(contractor);
  }
}

export default VerifyContractorEmailService;
