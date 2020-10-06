import { inject, injectable } from 'tsyringe';

import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ISuppliersTokensRepository from '@modules/suppliers/domain/repositories/ISuppliersTokensRepository';

interface IRequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetSupplierPasswordService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('SuppliersTokensRepository')
    private suppliersTokensRepository: ISuppliersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ password, token }: IRequestDTO): Promise<void> {
    const supplierToken = await this.suppliersTokensRepository.findByToken(
      token
    );

    if (!supplierToken) {
      throw new AppError('Suppliers does not exists');
    }

    const supplier = await this.suppliersRepository.findById(
      supplierToken.supplier_id
    );

    if (!supplier) {
      throw new AppError('Suppliers does not exists');
    }

    const tokenCreateAt = supplierToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    supplier.password = await this.hashProvider.generateHash(password);

    await this.suppliersRepository.save(supplier);
  }
}

export default ResetSupplierPasswordService;
