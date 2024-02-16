import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { ApiDocGenericGetOne } from 'src/app/common/api-doc-generic-get-one.decorator';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';

import { UserUpdateDto } from './dtos/user.update.dto';
import { ApiDocGenericDelete } from 'src/app/common/api-doc-generic-delete.decorator';
import { ReturnUserDto } from './dtos/returnUser.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiDocGenericPost('user-login', UserLoginDto, String)
  @UsePipes(ValidationPipe)
  async login(@Body() body: UserLoginDto): Promise<any> {
    const token = await this.userService.login(body);

    return `User Logado: ${token} `;
  }

  @Post('register')
  @ApiDocGenericPost('user-register', UserRegisterDto, ReturnUserDto)
  @UsePipes(ValidationPipe)
  async register(@Body() body: UserRegisterDto): Promise<ReturnUserDto> {
    const createdUser = await this.userService.register(body);
    return new ReturnUserDto(createdUser);
  }

  @Delete('delete/:userId')
  @ApiDocGenericDelete('user-delete')
  async delete(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
    return await this.userService.remove(+userId);
  }

  @Patch('update/:userId')
  @ApiDocGenericPost('user-update', UserUpdateDto)
  @UsePipes(ValidationPipe)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UserUpdateDto,
  ): Promise<any> {
    if (!Number(userId)) 'Id invalido';
    return await this.userService.update(+userId, body);
  }

  @Get(':userId')
  @ApiDocGenericGetOne('user-get-one', ReturnUserDto)
  async getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.getUserById(+userId);
    return new ReturnUserDto(user);
  }

  @Get()
  @ApiDocGenericGetAll('user-get-all', ReturnUserDto)
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }
}
