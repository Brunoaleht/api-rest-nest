import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCart1711495549792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "cart" ADD COLUMN "active" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "active"`);
  }
}
