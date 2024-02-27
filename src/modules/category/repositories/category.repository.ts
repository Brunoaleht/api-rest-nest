import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositoryTypeOrm: Repository<CategoryEntity>,
  ) {}

  async findOne(categoryId: number): Promise<CategoryEntity> {
    return await this.categoryRepositoryTypeOrm.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
  }

  async findCategory(): Promise<CategoryEntity[]> {
    return await this.categoryRepositoryTypeOrm.find();
  }
}
