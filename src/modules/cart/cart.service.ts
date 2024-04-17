import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartInsertDto } from './dtos/cart.insert.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { CartEntity } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartProductService: CartProductService,
  ) {}

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.createCart({ userId, active: true });
  }

  async insertProductInCart(
    insertCart: CartInsertDto,
    userId: number,
  ): Promise<CartEntity> {
    const createdCart = await this.findCartActiveByUserId(userId).catch(
      async () => {
        return await this.createCart(userId);
      },
    );

    await this.cartProductService.insertProductInCart(insertCart, createdCart);

    return this.findCartWithRelations(userId);
  }

  async findCartActiveByUserId(userId: number): Promise<CartEntity> {
    const findCart = await this.cartRepository.findOneByUserId(userId);
    if (!findCart) {
      throw new NotFoundException('Cart is not active');
    }

    return findCart;
  }

  async findCartWithRelations(userId: number): Promise<CartEntity> {
    return await this.cartRepository.findCartWithRelations(userId);
  }
}
