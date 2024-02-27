import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductEntity } from '../entity/product.entity';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepositoryTypeOrm: Repository<ProductEntity>,
  ) {}

  async findOne(productId: number): Promise<ProductEntity> {
    return await this.productRepositoryTypeOrm.findOne({
      where: { id: productId },
      relations: ['state'],
    });
  }

  async findProductsByCategoryId(categoryId: number): Promise<ProductEntity[]> {
    return await this.productRepositoryTypeOrm.find({
      where: { categoryId },
    });
  }
}
