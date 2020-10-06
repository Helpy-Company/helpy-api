import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMaterialsLists1601780205969
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materials_lists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'list_id',
            type: 'uuid',
          },
          {
            name: 'material_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'materials_lists',
      new TableForeignKey({
        name: 'fk_material_lists_id',
        columnNames: ['material_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'materials',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('materials', 'fk_material_lists_id');

    await queryRunner.dropTable('materials_lists');
  }
}
