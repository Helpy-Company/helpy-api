import { uuid } from 'uuidv4';
import ContractorToken from '@modules/contractors/infra/typeorm/entities/ContractorToken';
import IContractorsTokensRepository from '../IContractorsTokensRepository';

class FakeContractorsTokenRepository implements IContractorsTokensRepository {
  private contractorsTokens: ContractorToken[] = [];

  public async generate(contractor_id: string): Promise<ContractorToken> {
    const contractorToken = new ContractorToken();

    Object.assign(contractorToken, {
      id: uuid(),
      token: uuid(),
      contractor_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.contractorsTokens.push(contractorToken);

    return contractorToken;
  }

  public async findByToken(
    token: string
  ): Promise<ContractorToken | undefined> {
    const contractorToken = this.contractorsTokens.find(
      findToken => findToken.token === token
    );

    return contractorToken;
  }
}

export default FakeContractorsTokenRepository;
