import { Module } from '@nestjs/common';
import { StateEntity } from './entity/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateRepository } from './repositories/state.repository';
import { StateService } from './state.service';
import { StateController } from './state.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateRepository, StateService],
  exports: [StateService],
})
export class StateModule {}
