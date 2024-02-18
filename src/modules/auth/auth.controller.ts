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
import { ReturnLoginDto } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiDocGenericPost('user-login', LoginDto, ReturnLoginDto)
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto): Promise<ReturnLoginDto> {
    const login = await this.authService.login(body);

    return login;
  }
}
