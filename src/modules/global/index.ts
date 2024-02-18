import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const GlobalModules = [ConfigModule.forRoot(), JwtModule];
