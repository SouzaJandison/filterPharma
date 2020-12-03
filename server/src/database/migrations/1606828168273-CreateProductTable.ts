import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1606828168273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'product',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'code',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'value',
          type: 'integer'
        },
        {
          name: 'category',
          type: 'varchar'
        },
        {
          name: 'laboratory',
          type: 'varchar'
        },
        {
          name: 'amount',
          type: 'interger'
        },
        {
          name: 'id_drugstore',
          type: 'varchar'
        },
        {
          name: 'drugstore_id',
          type: 'uuid'
        }
      ],
      foreignKeys: [
        {
          name: 'ProductDrugstore',
          columnNames: ['drugstore_id'],
          referencedTableName: 'drugstores',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
