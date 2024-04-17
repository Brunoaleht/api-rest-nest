import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypes } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { CartInsertDto } from './dtos/cart.insert.dto';
import { CartEntity } from './entity/cart.entity';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { ReturnCartProductDto } from '../cart-product/dtos/returnCartProduct.dto';

@Roles(UserTypes.User, UserTypes.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('insert')
  @UsePipes(ValidationPipe)
  @ApiDocGenericPost('cart-insert', CartEntity)
  async insertCart(
    @UserId() userId: number,
    @Body() body: CartInsertDto,
  ): Promise<any> {
    const cart = await this.cartService.insertProductInCart(body, userId);

    return {
      ...cart,
      cartProduct: cart.cartProduct.map((cp) => new ReturnCartProductDto(cp)),
    };
  }
}
