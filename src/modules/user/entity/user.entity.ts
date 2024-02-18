import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from 'src/modules/address/entity/address.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id user',
    example: 1,
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name user',
    example: 'João Lucas',
  })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email is unique and required',
    example: 'jolucas@email.com',
  })
  email: string;

  @Column({ name: 'password', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Password example:',
    example: 'senha456',
  })
  password?: string;

  @Column({ name: 'type_user', nullable: true })
  @ApiProperty({
    type: Number,
    required: false,
    description: 'typeUser example:',
    example: 2,
  })
  typeUser?: number;

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

  @Column({ name: 'cpf', nullable: false, unique: true })
  @ApiProperty({
    type: String,
    required: true,
    description: 'CPF number',
    example: '11999999999',
  })
  cpf: string;

  @Column({ name: 'phone', nullable: true })
  @Optional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone number',
    example: '11999999999',
  })
  phone?: string;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];
}
