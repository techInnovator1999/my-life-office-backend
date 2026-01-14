import { Module } from '@nestjs/common';
import { LogService } from './logs.service';
import { RelationalLogsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLogsPersistenceModule],
  providers: [LogService],
  exports: [LogService, RelationalLogsPersistenceModule],
})
export class LogsModule {}
