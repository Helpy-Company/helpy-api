import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateTermsAndConditionsColumn1601588192243
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contractors',
      new TableColumn({
        name: 'accept_terms',
        type: 'boolean',
        default: false,
      })
    );
    await queryRunner.addColumn(
      'providers',
      new TableColumn({
        name: 'accept_terms',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('providers', 'accept_terms');
    await queryRunner.dropColumn('contractors', 'accept_terms');
  }
}
