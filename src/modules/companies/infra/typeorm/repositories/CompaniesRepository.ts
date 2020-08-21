import { getRepository, Repository } from 'typeorm';

import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompaniesDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findByEmail(email: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({ where: { email } });

    return company;
  }

  public async create({
    name, email, password, documentNumber, fantasyName, CEP, phone,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({
      name, CEP, documentNumber, email, fantasyName, password, phone,
    });

    await this.ormRepository.save(company);

    return company;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }

  public async index(): Promise<Company[]> {
    const companies = this.ormRepository.find();

    return companies;
  }
}

export default CompaniesRepository;
