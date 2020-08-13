import CompanyToken from '../infra/typeorm/entities/CompanyToken';

export default interface ICompanyTokensRepository {
  generate(id: string): Promise<CompanyToken>;
  findByToken(token: string): Promise<CompanyToken | undefined>;
};
