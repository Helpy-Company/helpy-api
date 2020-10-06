import SupplierToken from '../../infra/typeorm/entities/SupplierToken';

export default interface ISupplierTokensRepository {
  generate(id: string): Promise<SupplierToken>;
  findByToken(token: string): Promise<SupplierToken | undefined>;
}
