import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCartProduct1711061878563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE cart_product (
                "id" integer NOT NULL,
                "cart_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "amount" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY (id),
                FOREIGN KEY (cart_id) REFERENCES cart(id),
                FOREIGN KEY (product_id) REFERENCES product(id)
            );

            CREATE SEQUENCE cart_product_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE cart_product_id_seq OWNED BY cart_product.id;

            ALTER TABLE ONLY cart_product ALTER COLUMN id SET DEFAULT nextval('cart_product_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE cart_product;
        `);
  }
}
