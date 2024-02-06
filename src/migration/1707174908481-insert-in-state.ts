import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInState1707174908481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO state (id, name, uf, ibge) VALUES(1, 'Acre', 'AC', 12);
        INSERT INTO state (id, name, uf, ibge) VALUES(2, 'Alagoas', 'AL', 27);
        INSERT INTO state (id, name, uf, ibge) VALUES(3, 'Amazonas', 'AM', 13);
        INSERT INTO state (id, name, uf, ibge) VALUES(4, 'Amapá', 'AP', 16);
        INSERT INTO state (id, name, uf, ibge) VALUES(5, 'Bahia', 'BA', 29);
        INSERT INTO state (id, name, uf, ibge) VALUES(6, 'Ceará', 'CE', 23);
        INSERT INTO state (id, name, uf, ibge) VALUES(7, 'Distrito Federal', 'DF', 53);
        INSERT INTO state (id, name, uf, ibge) VALUES(8, 'Espírito Santo', 'ES', 32 );
        INSERT INTO state (id, name, uf, ibge) VALUES(9, 'Goiás', 'GO', 52 );
        INSERT INTO state (id, name, uf, ibge) VALUES(10, 'Maranhão', 'MA', 21);
        INSERT INTO state (id, name, uf, ibge) VALUES(11, 'Minas Gerais', 'MG', 31);
        INSERT INTO state (id, name, uf, ibge) VALUES(12, 'Mato Grosso do Sul', 'MS', 50);
        INSERT INTO state (id, name, uf, ibge) VALUES(13, 'Mato Grosso', 'MT', 51);
        INSERT INTO state (id, name, uf, ibge) VALUES(14, 'Pará', 'PA', 15);
        INSERT INTO state (id, name, uf, ibge) VALUES(15, 'Paraíba', 'PB', 25);
        INSERT INTO state (id, name, uf, ibge) VALUES(16, 'Pernambuco', 'PE', 26);
        INSERT INTO state (id, name, uf, ibge) VALUES(17, 'Piauí', 'PI', 22);
        INSERT INTO state (id, name, uf, ibge) VALUES(18, 'Paraná', 'PR', 41);
        INSERT INTO state (id, name, uf, ibge) VALUES(19, 'Rio de Janeiro', 'RJ', 33);
        INSERT INTO state (id, name, uf, ibge) VALUES(20, 'Rio Grande do Norte', 'RN', 24);
        INSERT INTO state (id, name, uf, ibge) VALUES(21, 'Rondônia', 'RO', 11);
        INSERT INTO state (id, name, uf, ibge) VALUES(22, 'Roraima', 'RR', 14);
        INSERT INTO state (id, name, uf, ibge) VALUES(23, 'Rio Grande do Sul', 'RS', 43);
        INSERT INTO state (id, name, uf, ibge) VALUES(24, 'Santa Catarina', 'SC', 42);
        INSERT INTO state (id, name, uf, ibge) VALUES(25, 'Sergipe', 'SE', 28);
        INSERT INTO state (id, name, uf, ibge) VALUES(26, 'São Paulo', 'SP', 35);
        INSERT INTO state (id, name, uf, ibge) VALUES(27, 'Tocantins', 'TO', 17);
        INSERT INTO state (id, name, uf, ibge) VALUES(99, 'Exterior', 'EX', 99);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.state
    `);
  }
}
