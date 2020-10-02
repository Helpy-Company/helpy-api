import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISupplierRepository from '../repositories/ISuppliersRepository';

@injectable()
class DeleteSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new AppError('Supplier does not exists.');
    }

    await this.supplierRepository.delete(id);
  }
}

export default DeleteSupplierService;
