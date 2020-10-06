import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangingCompanyProviderNameNull1600347860023
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'providers',
      'fantasyName',
      new TableColumn({
        name: 'fantasyName',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'providers',
      'fantasyName',
      new TableColumn({
        name: 'fantasyName',
        type: 'varchar',
      })
    );
  }
}
