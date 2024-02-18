import { ApiProperty } from '@nestjs/swagger';
import { CityEntity } from 'src/modules/city/entity/city.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('state')
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id state',
    example: 1,
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'name example:',
    example: 'São Paulo',
  })
  name: string;

  @Column({ name: 'ibge', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'ibge code example:',
    example: 35,
  })
  ibge: number;

  @CreateDateColumn()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Date of creation',
    example: `${new Date()}`,
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Date of update',
    example: `${new Date()}`,
  })
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date();
  }

  @OneToMany(() => CityEntity, (city) => city.state)
  cities?: CityEntity[];
}
