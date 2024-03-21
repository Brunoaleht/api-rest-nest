import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/modules/cart/entity/cart.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';

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

@Entity('cart-product')
export class CartProductEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id cart-product',
    example: 1,
  })
  id: number;

  @Column({ name: 'cart_id', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'cartId',
    example: 2,
  })
  cartId: number;

  @Column({ name: 'product_id', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'productId',
    example: 2,
  })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'amount',
    example: 6,
  })
  amount: number;

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

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.cartProduct,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;

  @ManyToOne(() => CartEntity, (cart: CartEntity) => cart.cartProduct)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: CartEntity;
}
