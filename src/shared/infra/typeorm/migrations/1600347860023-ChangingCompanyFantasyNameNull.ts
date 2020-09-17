import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangingCompanyFantasyNameNull1600347860023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('company', 'fantasyName', new TableColumn({
      name: 'fantasyName',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('company', 'fantasyName', new TableColumn({
      name: 'fantasyName',
      type: 'varchar',
    }));
  }
}
