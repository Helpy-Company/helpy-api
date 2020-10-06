import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import ISuppliersTokensRepository from '@modules/suppliers/domain/repositories/ISuppliersTokensRepository';

@injectable()
class VerifySupplierEmailService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('SuppliersTokensRepository')
    private suppliersTokensRepository: ISuppliersTokensRepository
  ) {}

  public async execute(token: string): Promise<void> {
    const supplierToken = await this.suppliersTokensRepository.findByToken(
      token
    );

    if (!supplierToken) {
      throw new AppError('Supplier token does not exists');
    }

    const supplier = await this.suppliersRepository.findById(
      supplierToken.supplier_id
    );

    if (!supplier) {
      throw new AppError('Supplier does not exists');
    }

    if (!(supplierToken.supplier_id === supplier.id)) {
      throw new AppError('Invalid token');
    }

    supplier.verified_email = true;

    await this.suppliersRepository.save(supplier);
  }
}

export default VerifySupplierEmailService;
