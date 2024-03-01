import { CategoryEntity } from '../entity/category.entity';

export class ReturnCategoryDto {
  id: number;
  name: string;
  description: string;
  products?: any[];

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.description = categoryEntity.description;
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => product)
      : undefined;
  }
}
