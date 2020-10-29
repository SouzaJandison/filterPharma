import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDrugstoreTable1603995752046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'drugstores',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'cnpj',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'phoneNumber',
          type: 'varchar'
        },
        {
          name: 'cep',
          type: 'varchar'
        },
        {
          name: 'city',
          type: 'varchar'
        },
        {
          name: 'uf',
          type: 'varchar'
        },
        {
          name: 'password',
          type: 'varchar'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('drugstores');
  }
}
