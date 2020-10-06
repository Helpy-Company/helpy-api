import { uuid } from 'uuidv4';
import ProviderToken from '../../../infra/typeorm/entities/ProviderToken';
import IProvidersTokensRepository from '../IProviderTokensRepository';

class FakeProvidersTokenRepository implements IProvidersTokensRepository {
  private providersTokens: ProviderToken[] = [];

  public async generate(provider_id: string): Promise<ProviderToken> {
    const providerToken = new ProviderToken();

    Object.assign(providerToken, {
      id: uuid(),
      token: uuid(),
      provider_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.providersTokens.push(providerToken);

    return providerToken;
  }

  public async findByToken(token: string): Promise<ProviderToken | undefined> {
    const providerToken = this.providersTokens.find(
      findToken => findToken.token === token
    );

    return providerToken;
  }
}

export default FakeProvidersTokenRepository;
