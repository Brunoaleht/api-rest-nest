import { Injectable, NotFoundException } from '@nestjs/common';
import { StateRepository } from './repositories/state.repository';
import { StateEntity } from './entity/state.entity';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StateRepository) {}

  async findOneState(stateId: number): Promise<StateEntity> {
    const findState = await this.stateRepository.findOne(stateId);
    if (!findState) {
      throw new NotFoundException('State not found');
    }
    return await this.stateRepository.findOne(stateId);
  }

  async getAllState(): Promise<StateEntity[]> {
    return await this.stateRepository.findAll();
  }
}
