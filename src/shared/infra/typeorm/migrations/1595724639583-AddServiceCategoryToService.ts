import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddServiceCategoryToService1595724639583
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'ServiceCategory',
        columnNames: ['service_category'],
        referencedColumnNames: ['title'],
        referencedTableName: 'services_categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services', 'ServiceCategory');
  }
}
