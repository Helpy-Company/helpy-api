import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class ChangingProviderCategory1599660544620
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('providers', 'ProviderCategory');

    await queryRunner.changeColumn(
      'providers',
      'provider_category',
      new TableColumn({
        name: 'bio',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'providers',
      'bio',
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
}
