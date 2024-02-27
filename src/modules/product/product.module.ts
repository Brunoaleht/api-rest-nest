import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CategoryModule } from '../category/category.module';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
  controllers: [],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
