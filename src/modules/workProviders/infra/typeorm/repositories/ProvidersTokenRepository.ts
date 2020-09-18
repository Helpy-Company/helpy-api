import { getRepository, Repository } from 'typeorm';

import IProviderTokensRepository from '@modules/workProviders/repositories/IProviderTokensRepository';

import ProviderToken from '../entities/ProviderToken';

class CompaniesTokenRepository implements IProviderTokensRepository {
  private ormRepository: Repository<ProviderToken>

  constructor() {
    this.ormRepository = getRepository(ProviderToken);
  }

  public async findByToken(token: string): Promise<ProviderToken | undefined> {
    const companyToken = await this.ormRepository.findOne({ where: { token } });

    return companyToken;
  }

  public async generate(provider_id: string): Promise<ProviderToken> {
    const companyToken = this.ormRepository.create({ provider_id });

    await this.ormRepository.save(companyToken);

    return companyToken;
  }
}

export default CompaniesTokenRepository;
