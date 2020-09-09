import {
  MigrationInterface, QueryRunner, TableForeignKey, TableColumn,
} from 'typeorm';

export default class ChangingCompanyCategory1599660544620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('company', 'CompanyCategory');

    await queryRunner.changeColumn('company', 'company_category', new TableColumn({
      name: 'bio',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('company', 'bio', new TableColumn({
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
}
