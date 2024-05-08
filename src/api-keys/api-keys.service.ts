import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}

  async validateApiKey(
    apiKey: string,
  ): Promise<{ storeId: string; livemode: boolean }> {
    const key = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!key) {
      throw new NotFoundException('API Key not found');
    }

    return {
      storeId: key.storeId,
      livemode: key.environment === 'live',
    };
  }

  async create(message: any) {
    const apiKey = await this.prisma.apiKey.findFirst({
      where: { id: message.id },
    });

    if (apiKey) return;

    await this.prisma.apiKey.create({
      data: {
        id: message.id,
        environment: message.environment,
        key: message.key,
        storeId: message.storeId,
        expireAt: message.expireAt,
      },
    });
  }
}
