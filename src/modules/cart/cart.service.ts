import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartInsertDto } from './dtos/cart.insert.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(userId: number) {
    return this.cartRepository.createCart({ userId, active: true });
  }

  async insertProductInCart(cart: CartInsertDto, userId: number) {
    const createdCart = await this.findCartActiveByUserId(userId).catch(
      async () => {
        await this.createCart(userId);
        return this.findCartActiveByUserId(userId);
      },
    );

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
