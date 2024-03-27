import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-product.entity';
import { CartProductService } from './cart-product.service';
import { CartProductRepository } from './repositories/cart-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity])],
  controllers: [],
  providers: [CartProductService, CartProductRepository],
  exports: [CartProductService],
})
export class CartProductModule {}
