import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GlobalModules } from './modules/global';
import { FeatureModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './guards/roles.guard';
import { User2Service } from './user2/user2.service';

@Module({
  imports: [
    ...GlobalModules,
    ...FeatureModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      migrationsRun: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    User2Service,
  ],
})
export class AppModule {}
