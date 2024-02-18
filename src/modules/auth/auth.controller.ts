import {
  Body,
  Controller,
  ValidationPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiDocGenericPost('user-login', LoginDto, ReturnUserDto)
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto): Promise<ReturnUserDto> {
    const user = await this.authService.login(body);

    return new ReturnUserDto(user);
  }
}
