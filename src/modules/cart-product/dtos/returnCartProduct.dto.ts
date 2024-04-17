import { ReturnProductDto } from 'src/modules/product/dtos/returnProduct.dto';
import { CartProductEntity } from '../entity/cart-product.entity';

export class ReturnCartProductDto {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  product: ReturnProductDto;

  constructor(cartProductEntity: CartProductEntity) {
    this.id = cartProductEntity.id;
    this.amount = cartProductEntity.amount;
    this.createdAt = cartProductEntity.created_at;
    this.updatedAt = cartProductEntity.updated_at;
    this.product = new ReturnProductDto(cartProductEntity.product);
  }
}
