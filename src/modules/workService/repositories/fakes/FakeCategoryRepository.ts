import ICategoryRepository from '../ICategoryRepository';
import ServiceCategory from '../../infra/typeorm/entities/ServiceCategory';

class FakeCategoryRepository implements ICategoryRepository {
  private date: Date = new Date();

  private categories: ServiceCategory[] = [
    {
      id: 'ea8e3662-e53f-4156-a518-e3402bd948eb',
      title: 'ARQUITETO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '9971c0ed-bd74-42cd-b63a-7be38a896380',
      title: 'AUTOMAÇÃO RESIDENCIAL',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '72888fc1-2eba-49ab-9a64-8cae7da613e6',
      title: 'CHAVEIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '4cb6441e-a88a-417d-a759-f388ecdf12ac',
      title: 'COIFAS E EXAUSTORES',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'ddc2f7cc-2210-45eb-8fb8-c8a215b3aa9c',
      title: 'DECORADOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '878f83db-6001-4b98-ae55-8af059a0eabe',
      title: 'DETETIZAÇÃO E DESINFECÇÃO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '393b635d-f892-48b7-ab54-a7cc779c72f5',
      title: 'ELETRICISTA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'd92d857c-6a64-447b-b195-a0882e693d94',
      title: 'EMPREITEIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '0d7698b5-faf8-45a5-963f-df36644a9885',
      title: 'ENCANADOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '5c4ad391-61a8-4cb0-b75b-5bd333f2b3f8',
      title: 'ENERGIA SOLAR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '4e0158af-02a9-4d14-8268-b3c1de00c4cd',
      title: 'ENGENHEIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '1d34ea98-db95-4c7f-9d77-fedd75f466ba',
      title: 'GESSO E DRYWALL',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '75c29dd2-628f-4933-b24f-541c73e62781',
      title: 'GÁS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'cd94a7a5-0853-4c4b-9c37-a22f35ffe703',
      title: 'IMPERMEABILIZAÇÃO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '437cf9e8-edcd-459c-b361-6f0e386adb7c',
      title: 'INSTALAÇÃO DE APARELHOS ELETRÔNICOS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'cdaf99b4-a7a8-4f78-bfc6-1f1030f3dc8e',
      title: 'JARDINAGEM E PAISAGISMO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'b9e22361-cb97-4b31-bf97-f4c1b9e51175',
      title: 'LIMPEZA DE VIDROS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '3f7dc44c-2498-4ae0-8952-2580c6dd2aec',
      title: 'LIMPEZA PÓS OBRA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'e42839b2-1fcf-497e-93e4-907984e41a4e',
      title: 'MARCENEIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'b9154f98-2768-46cf-b156-a4e46a52dbed',
      title: 'MARIDO DE ALUGUEL',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'd7acd00e-ef24-4f11-b94f-237738e6f2d0',
      title: 'MARMORARIA E GRANITOS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'b9115b1d-3f1b-46b3-8a34-b9e7c8b1142e',
      title: 'MONTAGEM DE MÓVEIS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'de1dfd20-067f-48c1-b2c5-e013345fff41',
      title: 'MUDANÇA E CARRETAS',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'bd0cbafb-800c-4bf6-9e90-34a6ce5cadc5',
      title: 'MAQUINÁRIO - ALUGUEL',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '5f7531a9-34be-409c-998a-aae83e22b1f2',
      title: 'PAVIMENTAÇÃO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'dc00b1e1-e43e-4645-8477-00b1c325c96f',
      title: 'PEDREIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '7abe4e91-9c5d-49d5-9973-f4e3b0f93169',
      title: 'PINTOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'd52b96d8-d03f-4d60-919b-ef0cea82443b',
      title: 'PISCINA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'b7f1f603-d0f1-47bc-b5fa-1b0aa8327867',
      title: 'POÇO ARTESIANO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '1844a8a7-2746-4ae0-b68d-d62e9f8ed4f8',
      title: 'REMOÇÃO DE ENTULHO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'b9ef328c-5a99-491c-831a-2850449fc9a4',
      title: 'SEGURANÇA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'fdadd9a8-9f01-40f0-9a01-6d51bd9b0634',
      title: 'SERRALHERIA E SOLDA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '4b12ea7b-2bd2-4aef-955d-491461bf3df6',
      title: 'TERRAPLANAGEM',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '27db153d-dbe4-441c-b571-62a20597e76b',
      title: 'TOPOGRAFIA',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '621e1497-b15d-4310-8c66-e05922d063a2',
      title: 'VIDRACEIRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '9a67cbb2-3291-4b22-86bc-dfb74a499c47',
      title: 'OUTRO',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async index(): Promise<ServiceCategory[]> {
    return this.categories;
  }

  public async findAllById(ids: string[]): Promise<ServiceCategory[]> {
    const categories = this.categories.filter(
      (cat, index) => cat.id === ids[index]
    );

    return categories;
  }
}

export default FakeCategoryRepository;
