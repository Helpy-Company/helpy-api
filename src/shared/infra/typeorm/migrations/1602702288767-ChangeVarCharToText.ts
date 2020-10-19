import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeVarCharToText1602702288767
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'services',
      'description',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      'providers',
      'bio',
      new TableColumn({
        name: 'bio',
        type: 'text',
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      'lists',
      'description',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'lists',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      'providers',
      'bio',
      new TableColumn({
        name: 'bio',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      'services',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      })
    );
  }
}
