import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-product.entity';
import { CartProductService } from './cart-product.service';
import { CartProductRepository } from './repositories/cart-product.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  controllers: [],
  providers: [CartProductService, CartProductRepository],
  exports: [CartProductService],
})
export class CartProductModule {}
