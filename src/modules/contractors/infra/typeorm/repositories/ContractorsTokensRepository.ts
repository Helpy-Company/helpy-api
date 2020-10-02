import { getRepository, Repository } from 'typeorm';

import IContractorTokensRepository from '@modules/contractors/repositories/IContractorsTokensRepository';

import ContractorToken from '../entities/ContractorToken';

class ContractorsTokensRepository implements IContractorTokensRepository {
  private ormRepository: Repository<ContractorToken>;

  constructor() {
    this.ormRepository = getRepository(ContractorToken);
  }

  public async generate(contractor_id: string): Promise<ContractorToken> {
    const contractorToken = this.ormRepository.create({ contractor_id });

    await this.ormRepository.save(contractorToken);

    return contractorToken;
  }

  public async findByToken(
    token: string
  ): Promise<ContractorToken | undefined> {
    const contractorToken = await this.ormRepository.findOne({
      where: { token },
    });

    return contractorToken;
  }
}

export default ContractorsTokensRepository;
