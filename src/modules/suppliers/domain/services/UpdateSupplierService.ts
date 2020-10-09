import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  supplier_id: string;
  fantasyName: string;
  email: string;
  password?: string;
  old_password?: string;
  CEP?: string;
  documentNumber?: string;
  phone?: string;
}

@injectable()
class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    supplier_id,
    email,
    CEP,
    documentNumber,
    fantasyName,
    old_password,
    password,
    phone,
  }: IRequestDTO): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findById(supplier_id);

    if (!supplier) {
      throw new AppError('Provider not found.');
    }

    const supplierWithUpdatedEmail = await this.suppliersRepository.findByEmail(
      email
    );

    if (
      supplierWithUpdatedEmail &&
      supplierWithUpdatedEmail.id !== supplier_id
    ) {
      throw new AppError('E-mail already in use.');
    }
    // atualiza nome e email
    supplier.email = email;

    // atualiza cep, documentNumber, phone, fantasyName
    supplier.CEP = CEP || supplier.CEP;
    supplier.documentNumber = documentNumber || supplier.documentNumber;
    supplier.phone = phone || supplier.phone;
    supplier.fantasyName = fantasyName || supplier.fantasyName;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        supplier.password
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      supplier.password = await this.hashProvider.generateHash(password);
    }

    return this.suppliersRepository.save(supplier);
  }
}

export default UpdateSupplierService;
