import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1706986368752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.address (
            id integer NOT NULL,
            user_id integer NOT NULL,
            street character varying NOT NULL,
            complement character varying,
            number integer NOT NULL,
            zip_code character varying NOT NULL,
            district character varying NOT NULL,
            city_id integer NOT NULL,
            created_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
            updated_at TIMESTAMP without time zone NOT NULL DEFAULT now(),
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES public.user (id),
            FOREIGN KEY (city_id) REFERENCES public.city (id)
        );
        
        CREATE SEQUENCE public.address_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
    
        ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;
    
        ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);    
    
        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.address;
    `);
  }
}
