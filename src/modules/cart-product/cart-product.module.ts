import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CartProductModule {}
