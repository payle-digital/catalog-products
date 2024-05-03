import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomId } from 'src/utils/generateRandomId';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private prismaService: PrismaService) {}

  async create(createPriceDto: CreatePriceDto) {
    const price = await this.prismaService.price.create({
      data: {
        id: `price_${generateRandomId(14)}`,
        accountId: '',
        ...createPriceDto,
        recurring: JSON.stringify(createPriceDto.recurring),
      },
    });

    return price;
  }

  async findAll() {
    const prices = await this.prismaService.price.findMany();
    return prices;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
