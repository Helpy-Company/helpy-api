import ContractorToken from '../../infra/typeorm/entities/ContractorToken';

export default interface IContractorTokensRepository {
  generate(id: string): Promise<ContractorToken>;
  findByToken(token: string): Promise<ContractorToken | undefined>;
}
