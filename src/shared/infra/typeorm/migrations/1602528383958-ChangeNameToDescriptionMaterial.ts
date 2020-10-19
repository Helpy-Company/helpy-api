import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeNameToDescriptionMaterial1602528383958
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'materials',
      'name',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'lists',
      new TableColumn({
        name: 'is_concluded',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lists', 'is_conclude');

    await queryRunner.changeColumn(
      'materials',
      'description',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      })
    );
  }
}
