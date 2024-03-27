import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartProductEntity } from 'src/modules/cart-product/entity/cart-product.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id cart',
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

  @Column({ name: 'active', nullable: false })
  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'active',
    example: true,
  })
  active: boolean;

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

  @OneToMany(
    () => CartProductEntity,
    (cartProduct: CartProductEntity) => cartProduct.cart,
  )
  cartProduct?: CartProductEntity[];
}
