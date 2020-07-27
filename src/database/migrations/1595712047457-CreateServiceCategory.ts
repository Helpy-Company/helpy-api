import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export default class CreateServiceCategory1595712047457
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isUnique: true,
          },
        ],
      })
    );

    await queryRunner.addColumn(
      'services',
      new TableColumn({
        name: 'service_category',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('services', 'service_category');

    await queryRunner.dropTable('services_categories');
  }
}
