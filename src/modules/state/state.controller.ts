import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';
import { ApiDocGenericGetOne } from 'src/app/common/api-doc-generic-get-one.decorator';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':stateId')
  @ApiDocGenericGetOne('state-get-one', StateEntity)
  async getStateById(
    @Param('stateId', ParseIntPipe) stateId: number,
  ): Promise<StateEntity> {
    return await this.stateService.findOneState(+stateId);
  }

  @Get()
  @ApiDocGenericGetAll('state-get-all', StateEntity)
  async getAllState(): Promise<StateEntity[]> {
    return await this.stateService.getAllState();
  }
}
