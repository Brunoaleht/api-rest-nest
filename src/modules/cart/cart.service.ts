import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartInsertDto } from './dtos/cart.insert.dto';
import { CartProductService } from '../cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartProductService: CartProductService,
  ) {}

  async createCart(userId: number) {
    return this.cartRepository.createCart({ userId, active: true });
  }

  async insertProductInCart(insertCart: CartInsertDto, userId: number) {
    const createdCart = await this.findCartActiveByUserId(userId).catch(
      async () => {
        await this.createCart(userId);
        return this.findCartActiveByUserId(userId);
      },
    );

    await this.cartProductService.insertProductInCart(insertCart, createdCart);

    return createdCart;
  }

  async findCartActiveByUserId(userId: number) {
    const findCart = await this.cartRepository.findOneByUserId(userId);
    if (!findCart) {
      throw new NotFoundException('Cart is not active');
    }

    return findCart;
  }
}
