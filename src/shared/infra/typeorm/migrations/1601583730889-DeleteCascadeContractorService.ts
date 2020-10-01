import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class DeleteCascadeContractorService1601583730889
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services', 'ContractorsServices');

    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'contractors_services',
        columnNames: ['contractor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contractors',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'ContractorsServices',
        columnNames: ['contractor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contractors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.dropForeignKey('services', 'contractors_services');
  }
}
