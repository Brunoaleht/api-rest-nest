import { Controller } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypes } from '../user/enum/user-type.enum';

@Roles(UserTypes.User)
@Controller('cart')
export class CartController {}
