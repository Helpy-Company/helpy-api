import { uuid } from 'uuidv4';
import SupplierToken from '@modules/suppliers/infra/typeorm/entities/SupplierToken';
import ISuppliersTokensRepository from '../ISuppliersTokensRepository';

class FakeSuppliersTokenRepository implements ISuppliersTokensRepository {
  private suppliersTokens: SupplierToken[] = [];

  public async generate(supplier_id: string): Promise<SupplierToken> {
    const supplierToken = new SupplierToken();

    Object.assign(supplierToken, {
      id: uuid(),
      token: uuid(),
      supplier_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.suppliersTokens.push(supplierToken);

    return supplierToken;
  }

  public async findByToken(token: string): Promise<SupplierToken | undefined> {
    const supplierToken = this.suppliersTokens.find(
      findToken => findToken.token === token
    );

    return supplierToken;
  }
}

export default FakeSuppliersTokenRepository;
