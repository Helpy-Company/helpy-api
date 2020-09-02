import Company from '../infra/typeorm/entities/Company';
import ICreateCompaniesDTO from '../dtos/ICreateCompaniesDTO';

export default interface ICompaniesRepository {
  findById(id: string): Promise<Company | undefined>;
  findByEmail(id: string): Promise<Company | undefined>;
  create(data: ICreateCompaniesDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
  index(): Promise<Company[]>;
}
