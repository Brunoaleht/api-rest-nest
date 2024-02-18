import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1708291583005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.user add unique("email");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
