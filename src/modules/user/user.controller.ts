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
import { UserRegisterDto } from './dtos/user.register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocGenericPost } from '../../app/common/api-doc-generic-post.decorator';
import { ApiDocGenericGetOne } from '../../app/common/api-doc-generic-get-one.decorator';
import { ApiDocGenericGetAll } from '../../app/common/api-doc-generic-get-all.decorator';
import { UserUpdateDto } from './dtos/user.update.dto';
import { ApiDocGenericDelete } from '../../app/common/api-doc-generic-delete.decorator';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePasswordDto } from './dtos/updated.password.dto';
import { UserId } from '../../decorators/user-id.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UserTypes } from './enum/user-type.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiDocGenericPost('user-register', UserRegisterDto, ReturnUserDto)
  @UsePipes(ValidationPipe)
  async register(@Body() body: UserRegisterDto): Promise<ReturnUserDto> {
    const createdUser = await this.userService.register(body);
    return new ReturnUserDto(createdUser);
  }

  @Roles(UserTypes.Admin)
  @Delete('delete/:userId')
  @ApiDocGenericDelete('user-delete')
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteResult> {
    return await this.userService.remove(+userId);
  }

  @Patch('update/:userId')
  @Roles(UserTypes.Admin, UserTypes.User)
  @ApiDocGenericPost('user-update', UserUpdateDto)
  @UsePipes(ValidationPipe)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UserUpdateDto,
  ): Promise<UpdateResult> {
    if (!Number(userId)) 'Id invalido';
    return await this.userService.update(+userId, body);
  }

  @Roles(UserTypes.Admin, UserTypes.User)
  @Patch('recover-password')
  @ApiDocGenericPost('user-update-password', UserUpdateDto)
  @UsePipes(ValidationPipe)
  async updatePassword(
    @UserId() userId: number,
    @Body() updatedPasswordDto: UpdatePasswordDto,
  ): Promise<ReturnUserDto> {
    console.log('userId', userId);
    console.log('updatedPasswordDto', updatedPasswordDto);
    const updatedUser = await this.userService.updatePassword(
      userId,
      updatedPasswordDto,
    );
    return new ReturnUserDto(updatedUser);
  }

  @Roles(UserTypes.Admin)
  @Get(':userId')
  @ApiDocGenericGetOne('user-get-one-relations', ReturnUserDto)
  async getUserByIdRelation(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.getUserByIdRelation(+userId);
    return new ReturnUserDto(user);
  }

  @Roles(UserTypes.Admin)
  @Get()
  @ApiDocGenericGetAll('user-get-all', ReturnUserDto)
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }
}
