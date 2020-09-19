import Provider from '../infra/typeorm/entities/Provider';
import ICreateProvidersDTO from '../dtos/ICreateProviderDTO';

export default interface IProviderRepository {
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(id: string): Promise<Provider | undefined>;
  create(data: ICreateProvidersDTO): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
  index(): Promise<Provider[]>;
  emailVerification(id: string): Promise<boolean | undefined>;
};
