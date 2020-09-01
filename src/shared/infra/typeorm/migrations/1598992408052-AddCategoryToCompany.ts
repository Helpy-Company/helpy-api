import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AddCategoryToCompany1598992408052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('company', new TableColumn({
      name: 'company_category',
      type: 'varchar',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('company', new TableForeignKey({
      name: 'CompanyCategory',
      columnNames: ['company_category'],
      referencedColumnNames: ['title'],
      referencedTableName: 'services_categories',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('company', 'CompanyCategory');

    await queryRunner.dropColumn('company', 'company_category');
  }
}
