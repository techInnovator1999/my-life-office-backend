import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsRepository } from '../../logs.repository';
import { LogsEntity } from '../entities/logs.entity';
import { Logs } from '@/logs/domain/logs';
import { LogsMapper } from '../mappers/logs.mapper';

@Injectable()
export class LogsRelationalRepository implements LogsRepository {
  constructor(
    @InjectRepository(LogsEntity)
    private readonly logssRepository: Repository<LogsEntity>,
  ) {}

  async create(data: Logs): Promise<Logs> {
    const persistenceModel = LogsMapper.toPersistence(data);
    const newEntity = await this.logssRepository.save(
      this.logssRepository.create(persistenceModel),
    );
    return LogsMapper.toDomain(newEntity);
  }
}
