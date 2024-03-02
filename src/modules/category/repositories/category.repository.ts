import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { CreateCategoryDto } from '../dtos/category.created.dto';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositoryTypeOrm: Repository<CategoryEntity>,
  ) {}

  async create(category: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepositoryTypeOrm.save(category);
  }

  async findOne(categoryId: number): Promise<CategoryEntity> {
    return await this.categoryRepositoryTypeOrm.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
  }

  async findByCategoryName(categoryName: string): Promise<CategoryEntity> {
    return await this.categoryRepositoryTypeOrm.findOne({
      where: { name: categoryName },
    });
  }

  async findCategory(): Promise<CategoryEntity[]> {
    return await this.categoryRepositoryTypeOrm.find();
  }
}
