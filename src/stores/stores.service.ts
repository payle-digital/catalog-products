import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prismaService: PrismaService) {}

  async create(storeId: string, apiKey: string) {
    await this.prismaService.store.create({
      data: {
        id: storeId,
        apiKey,
      },
    });
  }
}
