import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ProductEntity } from '../entity/product.entity';
import { CreateProductDto } from '../dtos/product.created.dto';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepositoryTypeOrm: Repository<ProductEntity>,
  ) {}

  async delete(productId: number): Promise<DeleteResult> {
    return await this.productRepositoryTypeOrm.delete(productId);
  }

  async updated(
    productId: number,
    product: CreateProductDto,
  ): Promise<UpdateResult> {
    return await this.productRepositoryTypeOrm.update(productId, product);
  }

  async create(product: CreateProductDto): Promise<ProductEntity> {
    return await this.productRepositoryTypeOrm.save(product);
  }

  async findOne(productId: number): Promise<ProductEntity> {
    return await this.productRepositoryTypeOrm.findOne({
      where: { id: productId },
      relations: ['category'],
    });
  }

  async findProductsByCategoryId(categoryId: number): Promise<ProductEntity[]> {
    return await this.productRepositoryTypeOrm.find({
      where: { categoryId },
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepositoryTypeOrm.find({
      relations: ['category'],
    });
  }
}
