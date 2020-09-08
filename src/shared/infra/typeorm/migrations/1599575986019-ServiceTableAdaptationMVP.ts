import {
  MigrationInterface, QueryRunner, TableColumn,
} from 'typeorm';

export default class ServiceTableAdaptationMVP1599575986019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('services', 'filters', new TableColumn({
      name: 'address',
      type: 'varchar',
    }));

    await queryRunner.addColumn('services',
      new TableColumn({
        name: 'urgency',
        type: 'varchar',
      }));

    await queryRunner.addColumn('services',
      new TableColumn({
        name: 'intention',
        type: 'varchar',
      }));

    await queryRunner.addColumn('services',
      new TableColumn({
        name: 'CEP',
        type: 'varchar',
        isNullable: true,
      }));

    await queryRunner.addColumn('services',
      new TableColumn({
        name: 'area',
        type: 'varchar',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('services', 'area');
    await queryRunner.dropColumn('services', 'CEP');
    await queryRunner.dropColumn('services', 'intention');
    await queryRunner.dropColumn('services', 'urgency');

    await queryRunner.changeColumn('services', 'address', new TableColumn({
      name: 'filters',
      type: 'varchar',
    }));
  }
}
