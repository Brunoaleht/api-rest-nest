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

import { UserUpdateDto } from './dtos/user.update.dto';
import { UserEntity } from './entity/user.entity';
import { ApiDocGenericDelete } from 'src/app/common/api-doc-generic-delete.decorator';
import { UserDto } from './dtos/user.dto';

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
  @ApiDocGenericPost('user-register', UserRegisterDto, UserEntity)
  async register(@Body() body: UserRegisterDto): Promise<UserEntity> {
    return await this.userService.register(body);
  }

  @Delete('delete/:userId')
  @ApiDocGenericDelete('user-delete')
  async delete(@Param('userId') userId: string): Promise<any> {
    return await this.userService.remove(+userId);
  }

  @Patch('update/:userId')
  @ApiDocGenericPost('user-update', UserUpdateDto)
  async update(
    @Param('userId') userId: string,
    @Body() body: UserUpdateDto,
  ): Promise<any> {
    return await this.userService.update(+userId, body);
  }

  @Get(':userId')
  @ApiDocGenericGetOne('user-get-one', UserEntity)
  async getUserById(@Param('userId') userId: string): Promise<UserEntity> {
    return await this.userService.getUserById(+userId);
  }

  @Get()
  @ApiDocGenericGetAll('user-get-all', UserEntity)
  async getAllUser(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }
}
