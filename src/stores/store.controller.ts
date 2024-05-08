import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @EventPattern('STORE_CREATED')
  async create(@Payload() message) {
    if (!message.id) return;
    await this.storesService.create(message.id);
  }
}
