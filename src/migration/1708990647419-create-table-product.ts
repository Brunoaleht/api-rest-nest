import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProduct1708990647419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.product (
                id integer NOT NULL,
                category_id integer NOT NULL,
                name VARCHAR(250) NOT NULL,
                description TEXT,
                price DOUBLE PRECISION NOT NULL,
                image character varying NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                PRIMARY KEY (id),
                FOREIGN KEY (category_id) REFERENCES public.category (id)
            );
            
            CREATE SEQUENCE public.product_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;

            ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.product;
        `);
  }
}
