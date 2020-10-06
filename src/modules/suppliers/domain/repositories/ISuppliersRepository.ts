import ICreateSuppliersDTO from '../dtos/ICreateSuppliersDTO';
import Supplier from '../../infra/typeorm/entities/Supplier';

export default interface ISuppliersRepository {
  create(data: ICreateSuppliersDTO): Promise<Supplier>;
  findById(id: string): Promise<Supplier | undefined>;
  findByEmail(id: string): Promise<Supplier | undefined>;
  save(supplierrs: Supplier): Promise<Supplier>;
  delete(id: string): Promise<void>;
  findByDocumentNumber(documentNumber: string): Promise<Supplier | undefined>;
}
