import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiKeysService } from './api-keys.service';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @EventPattern('APIKEY_CREATED')
  async create(@Payload() message) {
    await this.apiKeysService.create(message);
  }
}
