import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCategoryToProvider1598992408052
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'providers',
      new TableColumn({
        name: 'provider_category',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'providers',
      new TableForeignKey({
        name: 'ProviderCategory',
        columnNames: ['provider_category'],
        referencedColumnNames: ['title'],
        referencedTableName: 'services_categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('providers', 'ProviderCategory');

    await queryRunner.dropColumn('providers', 'provider_category');
  }
}
