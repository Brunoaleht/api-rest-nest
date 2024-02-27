import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductEntity } from './entity/product.entity';
import { CategoryService } from '../category/category.service';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async getProductById(productId: number): Promise<ProductEntity> {
    const city = await this.productRepository.findOne(productId);
    if (!city) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    return city;
  }

  async getAllProductByCategoryId(
    categoryId: number,
  ): Promise<ProductEntity[]> {
    await this.categoryService.getCategoryId(categoryId);
    const products =
      await this.productRepository.findProductsByCategoryId(categoryId);

    return products;
  }
}
