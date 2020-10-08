import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSuppliersService from '@modules/suppliers/domain/services/CreateSuppliersService';
import { classToClass } from 'class-transformer';
import DeleteSupplierService from '@modules/suppliers/domain/services/DelteSuppliersService';
import UpdateSupplierService from '@modules/suppliers/domain/services/UpdateSupplierService';

class SupplierController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
      accept_terms,
    } = request.body;

    const createSupplier = container.resolve(CreateSuppliersService);

    const supplier = await createSupplier.execute({
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
      accept_terms,
    });

    return response.json(classToClass(supplier));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteSupplier = container.resolve(DeleteSupplierService);
    await deleteSupplier.execute(id);
    return response.status(200).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      fantasyName,
      email,
      password,
      old_password,
      CEP,
      documentNumber,
      phone,
    } = request.body;

    const supplier_id = request.user.id;

    const updateSupplier = container.resolve(UpdateSupplierService);

    const supplier = await updateSupplier.execute({
      supplier_id,
      fantasyName,
      email,
      password,
      old_password,
      CEP,
      documentNumber,
      phone,
    });

    return response.json(classToClass(supplier));
  }
}

export default SupplierController;
