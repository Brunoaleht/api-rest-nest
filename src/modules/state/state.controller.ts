import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':stateId')
  @ApiDocGenericGetAll('state-get-one', StateEntity)
  async getStateById(@Param('stateId') stateId: string): Promise<StateEntity> {
    return await this.stateService.findOneState(+stateId);
  }

  @Get()
  @ApiDocGenericGetAll('state-get-all', StateEntity)
  async getAllState(): Promise<StateEntity[]> {
    return await this.stateService.getAllState();
  }
}
