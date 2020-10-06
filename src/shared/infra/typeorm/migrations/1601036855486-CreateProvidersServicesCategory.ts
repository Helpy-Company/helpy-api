import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProvidersServicesCategory1601036855486
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers_services_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'service_category_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'providers_services_categories',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        name: 'fk_providers_service_category',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'providers_services_categories',
      new TableForeignKey({
        columnNames: ['service_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services_categories',
        name: 'fk_service_category_providers',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'providers_services_categories',
      'fk_service_category_providers'
    );
    await queryRunner.dropForeignKey(
      'providers_services_categories',
      'fk_providers_service_category'
    );
    await queryRunner.dropTable('providers_services_categories');
  }
}
