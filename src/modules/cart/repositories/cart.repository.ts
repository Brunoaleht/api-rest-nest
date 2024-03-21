import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CartEntity } from '../entity/cart.entity';

export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepositoryTypeOrm: Repository<CartEntity>,
  ) {}

  async create(cart: CartEntity): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.save(cart);
  }

  async findOne(cartId: number): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.findOne({
      where: { id: cartId },
    });
  }

  async findByUserId(userId: number): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.findOne({
      where: { userId },
    });
  }
}
