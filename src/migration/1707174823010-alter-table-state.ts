import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableState1707174823010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.state
                ADD uf varchar(2) NOT NULL,
                ADD ibge integer NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.state
                DROP COLUMN uf;
        `);
  }
}
