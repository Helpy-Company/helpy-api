import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Provider from '@modules/workProviders/infra/typeorm/entities/Provider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequest {
  provider_id: string;
  name: string;
  email: string;
  fantasyName?: string;
  phone?: string;
  CEP?: string;
  documentNumber?: string;
  old_password?: string;
  password?: string;
  bio?: string
}

@injectable()
class UpdateProviderProfileService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProviderRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    provider_id,
    name,
    email,
    fantasyName,
    phone,
    CEP,
    documentNumber,
    old_password,
    password,
    bio,
  }: IRequest): Promise<Provider> {
    const provider = await this.providerRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider not found.');
    }

    const providerWithUpdatedEmail = await this.providerRepository.findByEmail(email);

    if (providerWithUpdatedEmail && providerWithUpdatedEmail.id !== provider_id) {
      throw new AppError('E-mail already in use.');
    }
    // atualiza email e nome
    provider.name = name;
    provider.email = email;

    // atualiza cep, documentNumber, phone, fantasyName
    provider.CEP = CEP || provider.CEP;
    provider.documentNumber = documentNumber || provider.documentNumber;
    provider.phone = phone || provider.phone;
    provider.fantasyName = fantasyName || provider.fantasyName;
    provider.bio = bio || provider.bio;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        provider.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      provider.password = await this.hashProvider.generateHash(password);
    }

    return this.providerRepository.save(provider);
  }
}

export default UpdateProviderProfileService;
