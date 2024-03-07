import { ReturnCategoryDto } from '../../category/dtos/returnCategory.dto';
import { ProductEntity } from '../entity/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  category?: ReturnCategoryDto;

  constructor(productEntity: ProductEntity) {
    this.categoryId = productEntity.categoryId;
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.description = productEntity.description;
    this.price = productEntity.price;
    this.image = productEntity.image;
    this.category = productEntity.category
      ? new ReturnCategoryDto(productEntity.category)
      : null;
  }
}
