import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../product/entity/product.entity';

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

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id category',
    example: 1,
  })
  id: number;

  @Column({ name: 'name', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'name example:',
    example: 'Jogos',
  })
  name: string;

  @Column({ name: 'description', nullable: true })
  @ApiProperty({
    type: String,
    required: false,
    description: 'description example:',
    example: 'jogo de guerra muito bom',
  })
  description: string;

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

  @OneToMany(() => ProductEntity, (product) => product.category)
  products?: ProductEntity[];
}
