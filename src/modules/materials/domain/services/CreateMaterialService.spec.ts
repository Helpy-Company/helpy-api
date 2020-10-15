import FakeMaterialRepository from '../repositories/fakes/FakeMaterialRepository';
import CreateMaterailService from './CreateMaterialService';

let materialRepository: FakeMaterialRepository;
let createMaterialService: CreateMaterailService;

describe('Create Material', () => {
  beforeEach(() => {
    materialRepository = new FakeMaterialRepository();
    createMaterialService = new CreateMaterailService(materialRepository);
  });

  it('should be able to create a material', async () => {
    const material = await createMaterialService.execute({
      description: 'name',
      quantity: 10,
    });

    expect(material).toHaveProperty('id');
  });
});
