import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMaterialService from '@modules/materials/domain/services/CreateMaterialService';
import UpdateMaterialService from '@modules/materials/domain/services/UpdateMaterialService';
import DeleteMaterialService from '@modules/materials/domain/services/DeleteMaterialService';

class MaterialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, quantity } = request.body;

    const createMaterial = container.resolve(CreateMaterialService);

    const material = await createMaterial.execute({
      description,
      quantity,
    });

    return response.json(material);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, description, quantity } = request.body;

    const updateMaterial = container.resolve(UpdateMaterialService);

    const material = await updateMaterial.execute({
      id,
      description,
      quantity,
    });

    return response.json(material);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { material_id } = request.body;

    const deleteMaterial = container.resolve(DeleteMaterialService);

    await deleteMaterial.execute(material_id);

    return response.status(200).send();
  }
}

export default MaterialController;
