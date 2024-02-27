import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../category/entity/category.entity';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id product',
    example: 1,
  })
  id: number;

  @Column({ name: 'category_id', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'categoryId',
    example: 2,
  })
  categoryId: number;

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

  @Column({ name: 'price', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'price example:',
    example: 10.0,
  })
  price: number;

  @Column({ name: 'image', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'image example:',
    example: 'https://www.google.com.br/image.png',
  })
  image: string;

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

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;
}
