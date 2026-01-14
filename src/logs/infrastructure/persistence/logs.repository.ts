import { Logs } from '@/logs/domain/logs';

export abstract class LogsRepository {
  abstract create(
    data: Omit<Logs, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Logs>;
}
