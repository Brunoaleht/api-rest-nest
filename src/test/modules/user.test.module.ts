import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { UserRepository } from '../../modules/user/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserTestingModule {}
