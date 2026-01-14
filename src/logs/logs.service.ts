// error-logger.service.ts
import { Injectable } from '@nestjs/common';
import { Logs } from './domain/logs';
import { LogsRepository } from './infrastructure/persistence/logs.repository';

@Injectable()
export class LogService {
  constructor(private readonly logsRepository: LogsRepository) {}

  async logError(
    path: string,
    message: string,
    stack: string,
    method: string,
    status: number,
    payload?: string,
  ): Promise<Logs> {
    return await this.logsRepository.create({
      path,
      message,
      stack,
      method,
      status,
      payload,
    });
  }
}
