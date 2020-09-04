import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddVerifiedEmailColumn1599250515929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'verified_email',
      type: 'boolean',
      default: false,
    }));

    await queryRunner.addColumn('company', new TableColumn({
      name: 'verified_email',
      type: 'boolean',
      default: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'verified_email');
    await queryRunner.dropColumn('company', 'verified_email');
  }
}
