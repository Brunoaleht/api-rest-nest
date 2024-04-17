import { Injectable, NotFoundException } from '@nestjs/common';
import { CartProductRepository } from './repositories/cart-product.repository';
import { CartProductCreatedDto } from './dtos/cart-product.created.dto';
import { CartInsertDto } from '../cart/dtos/cart.insert.dto';
import { CartEntity } from '../cart/entity/cart.entity';
import { CartProductEntity } from './entity/cart-product.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    private readonly cartProductRepository: CartProductRepository,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const productInCart = await this.cartProductRepository.getProductInCart(
      productId,
      cartId,
    );

    if (!productInCart) {
      throw new NotFoundException('Product not found in cart');
    }

    console.log(productInCart);

    return productInCart;
  }

  async createCartProduct(
    cartProduct: CartInsertDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProductCreated =
      await this.cartProductRepository.createCartProduct({
        ...cartProduct,
        cartId,
      });

    console.log(cartProductCreated);

    return cartProductCreated;
  }

  async insertProductInCart(
    insertProduct: CartInsertDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.getProductById(insertProduct.productId);

    const productInCart = await this.verifyProductInCart(
      insertProduct.productId,
      cart.id,
    ).catch(() => undefined);

    if (!productInCart) {
      return await this.createCartProduct(insertProduct, cart.id);
    }

    return await this.createCartProduct(
      { ...productInCart, amount: productInCart.amount + insertProduct.amount },
      cart.id,
    );
  }
}
