import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';
import { ApiDocGenericGetAll } from '../../app/common/api-doc-generic-get-all.decorator';
import { ApiDocGenericGetOne } from '../../app/common/api-doc-generic-get-one.decorator';
import { ReturnStateDto } from './dtos/returnSate.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':stateId')
  @ApiDocGenericGetOne('state-get-one', ReturnStateDto)
  async getStateById(
    @Param('stateId', ParseIntPipe) stateId: number,
  ): Promise<ReturnStateDto> {
    const state = await this.stateService.findOneState(+stateId);
    return new ReturnStateDto(state);
  }

  @Get()
  @ApiDocGenericGetAll('state-get-all', StateEntity)
  async getAllState(): Promise<StateEntity[]> {
    return await this.stateService.getAllState();
  }
}
