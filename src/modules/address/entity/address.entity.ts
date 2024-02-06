import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id address',
    example: 1,
  })
  id: number;

  @Column({ name: 'user_id', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'userId',
    example: 2,
  })
  userId: number;

  @Column({ name: 'complement', nullable: true })
  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'complement example:',
    example: 'casa amarela 2 andar',
  })
  complement?: string;

  @Column({ name: 'street', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'street example:',
    example: 'Rua das flores',
  })
  street: string;

  @Column({ name: 'number', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Number example:',
    example: 2,
  })
  numberAddress: number;

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

  @Column({ name: 'cep', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Cep number',
    example: '11999999999',
  })
  cep: string;

  @Column({ name: 'city_id', nullable: true })
  @ApiProperty({
    type: Number,
    required: true,
    describe: 'City id',
    example: 120,
  })
  cityId: number;
}
