import { Module } from '@nestjs/common';
import { StateService } from '../../modules/state/state.service';
import { StateRepository } from '../../modules/state/repositories/state.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from '../../modules/state/entity/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  providers: [StateService, StateRepository],
  exports: [StateService],
})
export class StateTestingModule {}
