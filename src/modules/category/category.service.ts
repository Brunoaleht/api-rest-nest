import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryEntity } from './entity/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategoryId(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`CategoryId ${categoryId} not found`);
    }
    return category;
  }

  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findCategory();
  }
}