import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCity1706986353355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.city (
        id integer NOT NULL,
        name character varying NOT NULL,
        state_id integer NOT NULL,
        created_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
        updated_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
        PRIMARY KEY (id),
        FOREIGN KEY (state_id) REFERENCES public.state (id)
      );
      
        CREATE SEQUENCE public.city_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;

        ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);    

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.city;
    `);
  }
}
