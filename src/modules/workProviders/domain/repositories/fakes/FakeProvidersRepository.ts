import { uuid } from 'uuidv4';
import IProviderRepository from '../IProviderRepository';
import ICreateProviderDTO from '../../dtos/ICreateProviderDTO';
import Provider from '../../../infra/typeorm/entities/Provider';

class FakeProviderRepository implements IProviderRepository {
  private providers: Provider[] = [];

  public async create(data: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider();

    Object.assign(
      provider,
      {
        id: uuid(),
      },
      data
    );

    this.providers.push(provider);

    return provider;
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const providerExists = this.providers.find(
      provider => provider.email === email
    );

    return providerExists;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const providerExists = this.providers.find(provider => provider.id === id);

    return providerExists;
  }

  public async save(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      providerUpdate => providerUpdate.id === provider.id
    );
    this.providers[findIndex] = provider;

    return provider;
  }

  public async index(): Promise<Provider[]> {
    return this.providers;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === id
    );

    this.providers.splice(0, findIndex);
  }
}

export default FakeProviderRepository;
