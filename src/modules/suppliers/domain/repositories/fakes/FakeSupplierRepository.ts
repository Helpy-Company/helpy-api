import { uuid } from 'uuidv4';
import ISupplierRepository from '../ISuppliersRepository';
import ICreateSuppliersDTO from '../../dtos/ICreateSuppliersDTO';
import Supplier from '../../../infra/typeorm/entities/Supplier';

class FakeSuppliersRepository implements ISupplierRepository {
  private suppliers: Supplier[] = [];

  public async findByEmail(email: string): Promise<Supplier | undefined> {
    const findSupplier = this.suppliers.find(
      supplier => supplier.email === email
    );

    return findSupplier;
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    const findSupplier = this.suppliers.find(supplier => supplier.id === id);

    return findSupplier;
  }

  public async create(supplierData: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = new Supplier();

    Object.assign(supplier, { id: uuid() }, supplierData);

    this.suppliers.push(supplier);

    return supplier;
  }

  public async save(supplier: Supplier): Promise<Supplier> {
    const findIndex = this.suppliers.findIndex(
      findSupplier => findSupplier.id === supplier.id
    );

    this.suppliers[findIndex] = supplier;

    return supplier;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.suppliers.findIndex(
      findSupplier => findSupplier.id === id
    );

    this.suppliers.splice(0, findIndex);
  }

  public async findByDocumentNumber(
    documentNumber: string
  ): Promise<Supplier | undefined> {
    const findSupplier = this.suppliers.find(
      supplier => supplier.documentNumber === documentNumber
    );

    return findSupplier;
  }
}

export default FakeSuppliersRepository;
