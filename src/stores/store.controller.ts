import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @EventPattern('STORE_CREATED')
  async create(@Payload() message) {
    console.log(message);
    if (!message.storeId) return;
    await this.storesService.create(message.storeId);
  }
}
