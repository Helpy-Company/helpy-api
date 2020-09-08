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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('service', 'CEP');
    await queryRunner.dropColumn('service', 'intention');
    await queryRunner.dropColumn('service', 'urgency');

    await queryRunner.changeColumn('services', 'address', new TableColumn({
      name: 'filters',
      type: 'varchar',
    }));
  }
}
