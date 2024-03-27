import { Module } from '@nestjs/common';
import { CartEntity } from './entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartRepository } from './repositories/cart.repository';
import { CartService } from './cart.service';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [],
})
export class CartModule {}
