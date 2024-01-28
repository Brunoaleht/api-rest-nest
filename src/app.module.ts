import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GlobalModules } from './modules/global';
import { FeatureModule } from './modules';

@Module({
  imports: [...GlobalModules, ...FeatureModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
