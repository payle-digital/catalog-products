import { Module } from '@nestjs/common';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';

@Module({
  providers: [ApiKeysService],
  controllers: [ApiKeysController],
})
export class ApiKeysModule {}
