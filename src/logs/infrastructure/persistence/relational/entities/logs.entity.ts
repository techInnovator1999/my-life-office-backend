import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Logs } from '@/logs/domain/logs';

@Entity({
  name: 'logs',
})
export class LogsEntity extends EntityRelationalHelper implements Logs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  path: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text' })
  stack: string;

  @Column({ type: 'text' })
  method: string;

  @Column({ type: 'text', nullable: true })
  payload?: string;

  @Column({ type: 'integer' })
  status: number;

  @CreateDateColumn()
  timestamp: Date;
}
