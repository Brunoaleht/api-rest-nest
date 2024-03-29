import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductEntity } from './entity/product.entity';
import { CategoryService } from '../category/category.service';
import { ProductRepository } from './repositories/product.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dtos/product.created.dto';
import { UpdatedProductDto } from './dtos/product.updated.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.getProductById(productId);
    return await this.productRepository.delete(productId);
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.getCategoryId(product?.categoryId);
    return this.productRepository.create(product);
  }

  async updateProduct(
    productId: number,
    product: UpdatedProductDto,
  ): Promise<UpdateResult> {
    const oldProduct = await this.getProductById(productId);
    const category = await this.categoryService.getCategoryId(
      product?.categoryId,
    );
    const newProduct = { ...oldProduct, ...product, category: category };
    return this.productRepository.updated(productId, newProduct);
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    return product;
  }

  async getAllProductByCategoryId(
    categoryId: number,
  ): Promise<ProductEntity[]> {
    await this.categoryService.getCategoryId(categoryId);
    const products =
      await this.productRepository.findProductsByCategoryId(categoryId);

    return products;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}
