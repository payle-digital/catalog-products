import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string) {
    const store = await this.prisma.store.findFirst({ where: { id: storeId } });
    if (store) return;
    await this.prisma.store.create({
      data: {
        id: storeId,
      },
    });
  }
}
