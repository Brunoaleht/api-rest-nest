import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableState1706986328981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.state ( 
        id integer NOT NULL,
        name character varying NOT NULL,
        created_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
        updated_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
        PRIMARY KEY (id)
        );

        CREATE SEQUENCE public.state_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        ALTER SEQUENCE public.state_id_seq OWNED BY public.state.id;

        ALTER TABLE ONLY public.state ALTER COLUMN id SET DEFAULT nextval('public.state_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.state;
      `);
  }
}
