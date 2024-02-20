import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../../address/entity/address.entity';
import { StateEntity } from '../../state/entity/state.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Id city',
    example: 1,
  })
  id: number;

  @Column({ name: 'state_id', nullable: false })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'stateId',
    example: 2,
  })
  stateId: number;

  @Column({ name: 'name', nullable: false })
  @ApiProperty({
    type: String,
    required: true,
    description: 'name example:',
    example: 'São Paulo',
  })
  name: string;

  @CreateDateColumn()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Date of creation',
    example: `${new Date()}`,
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Date of update',
    example: `${new Date()}`,
  })
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date();
  }

  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses?: AddressEntity[];

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: StateEntity;
}
