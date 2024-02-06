import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from '../entity/state.entity';
import { Repository } from 'typeorm';

export class StateRepository {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepositoryTypeOrm: Repository<StateEntity>,
  ) {}

  async findOne(stateId: number): Promise<StateEntity> {
    return await this.stateRepositoryTypeOrm.findOne({
      where: { id: stateId },
    });
  }

  async findAll(): Promise<StateEntity[]> {
    return await this.stateRepositoryTypeOrm.find();
  }
}
