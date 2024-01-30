import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { ApiDocGenericGetOne } from 'src/app/common/api-doc-generic-get-one.decorator';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';
import { UserInterface } from './interface/user.interface';
import { UserUpdateDto } from './dtos/user.update.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiDocGenericPost('user-login', UserLoginDto, String)
  async login(@Body() body: UserLoginDto): Promise<any> {
    const token = await this.userService.login(body);

    return `User Logado: ${token} `;
  }

  @Post('register')
  @ApiDocGenericPost('user-register', UserRegisterDto, UserInterface)
  async register(@Body() body: UserRegisterDto): Promise<UserInterface> {
    return await this.userService.register(body);
  }

  @Delete('delete/:userId')
  @ApiDocGenericPost('user-delete', UserInterface)
  async delete(@Param('userId') userId: string): Promise<UserInterface> {
    return await this.userService.remove(+userId);
  }

  @Patch('update/:userId')
  @ApiDocGenericPost('user-update', UserUpdateDto, UserInterface)
  async update(
    @Param('userId') userId: string,
    @Body() body: UserUpdateDto,
  ): Promise<UserInterface> {
    return await this.userService.update(+userId, body);
  }

  @Get(':userId')
  @ApiDocGenericGetOne('user-get-one', UserInterface)
  async getUserById(@Param('userId') userId: string): Promise<UserInterface> {
    return await this.userService.getUserById(+userId);
  }

  @Get()
  @ApiDocGenericGetAll('user-get-all', UserInterface)
  async getAllUser(): Promise<UserInterface[]> {
    return await this.userService.getAllUser();
  }
}
