import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMaterialService from '@modules/materials/domain/services/CreateMaterialService';

class MaterialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, quantity } = request.body;

    const createMaterial = container.resolve(CreateMaterialService);

    const material = await createMaterial.execute({
      name,
      quantity,
    });

    return response.json(material);
  }
}

export default MaterialController;
