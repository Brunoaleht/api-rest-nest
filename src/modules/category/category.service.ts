import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryEntity } from './entity/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dtos/category.created.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryExist = await this.categoryRepository.findByCategoryName(
      category.name,
    );
    if (categoryExist) {
      throw new BadRequestException(
        `CategoryName ${category.name} already exists`,
      );
    }
    return this.categoryRepository.create(category);
  }

  async getCategoryId(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`CategoryId ${categoryId} not found`);
    }
    return category;
  }

  async findByCategoryName(categoryName: string): Promise<CategoryEntity> {
    const category =
      await this.categoryRepository.findByCategoryName(categoryName);
    if (!category) {
      throw new NotFoundException(`CategoryName ${categoryName} not found`);
    }
    return category;
  }

  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findCategory();
  }
}
