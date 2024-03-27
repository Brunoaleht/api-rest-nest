import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CartEntity } from '../entity/cart.entity';
import { CartInsertDto } from '../dtos/cart.insert.dto';
import { CartCreatedDto } from '../dtos/cart.created.dto';

export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepositoryTypeOrm: Repository<CartEntity>,
  ) {}

  async createCart(cart: CartCreatedDto): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.save(cart);
  }

  // async insertCart(cart: CartInsertDto): Promise<CartEntity> {
  //   return await this.cartRepositoryTypeOrm.save(cart);
  // }

  async findOne(cartId: number): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.findOne({
      where: { id: cartId },
    });
  }

  async findOneByUserId(userId: number): Promise<CartEntity> {
    return await this.cartRepositoryTypeOrm.findOne({
      where: { userId, active: true },
    });
  }

  async findAllByUserId(userId: number): Promise<CartEntity[]> {
    return await this.cartRepositoryTypeOrm.find({
      where: { userId },
    });
  }
}
