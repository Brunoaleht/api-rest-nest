import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CartProductEntity } from '../entity/cart-product.entity';
import { CartInsertDto } from 'src/modules/cart/dtos/cart.insert.dto';
import { CartEntity } from 'src/modules/cart/entity/cart.entity';
import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { CartProductCreatedDto } from '../dtos/cart-product.created.dto';

export class CartProductRepository {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepositoryTypeOrm: Repository<CartProductEntity>,
  ) {}

  async getProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const productInCart = await this.cartProductRepositoryTypeOrm.findOne({
      where: { productId, cartId },
    });

    return productInCart;
  }

  async createCartProduct(
    cartProduct: CartProductCreatedDto,
  ): Promise<CartProductEntity> {
    return await this.cartProductRepositoryTypeOrm.save(cartProduct);
  }

  async updatedCartProduct(
    cartProductId: number,
    cartProduct: CartProductCreatedDto,
  ): Promise<CartProductEntity> {
    await this.cartProductRepositoryTypeOrm.update(cartProductId, cartProduct);
    const productInCart = await this.cartProductRepositoryTypeOrm.findOne({
      where: { id: cartProductId },
    });
    return productInCart;
  }
}
