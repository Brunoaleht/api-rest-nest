import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<any> {
    const token = await this.userService.login(body);

    return `User Logado: ${token} `;
  }

  @Post('register')
  async register(@Body() body: UserRegisterDto): Promise<any> {
    return await this.userService.register(body);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<any> {
    return await this.userService.getUserById(+userId);
  }

  @Get()
  async getAllUser(): Promise<any> {
    return await this.userService.getAllUser();
  }
}
