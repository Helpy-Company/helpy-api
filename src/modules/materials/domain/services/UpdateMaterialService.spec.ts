import FakeMaterialRepository from '../repositories/fakes/FakeMaterialRepository';
import UpdateMaterialService from './UpdateMaterialService';

let materialRepository: FakeMaterialRepository;
let updateMaterialService: UpdateMaterialService;

describe('Update Material', () => {
  beforeEach(() => {
    materialRepository = new FakeMaterialRepository();
    updateMaterialService = new UpdateMaterialService(materialRepository);
  });

  it('should be able to update a material', async () => {
    const material = await materialRepository.create({
      name: 'name',
      quantity: 10,
    });

    await updateMaterialService.execute({
      id: material.id,
      name: 'name2',
      quantity: 20,
    });

    expect(material.name).toBe('name2');
  });
});
