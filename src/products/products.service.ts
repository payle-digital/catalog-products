import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomId } from 'src/utils/generateRandomId';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FindManyProductQuery,
  ProductListResponse,
} from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
    storeDetails: { storeId: string; livemode: boolean },
  ) {
    const product = await this.prismaService.product.create({
      data: {
        id: `prod_${generateRandomId(14)}`,
        livemode: storeDetails.livemode,
        ...createProductDto,
        prices: {
          create: {
            id: `price_${generateRandomId(14)}`,
            billingScheme: createProductDto.default_price_data.billingScheme,
            currency: createProductDto.default_price_data.currency,
            recurring: createProductDto.default_price_data.recurring,
            type: createProductDto.default_price_data.type,
            store: { connect: { id: storeDetails.storeId } },
          },
        },
        store: {
          connect: { id: storeDetails.storeId },
        },
      },
    });

    return product;
  }

  async findAll(
    queryDto: QueryProductDto,
    storeDetails: { storeId: string; livemode: boolean },
  ): Promise<ProductListResponse> {
    const { expand, startingAfter, limit = 10 } = queryDto;

    const query: FindManyProductQuery = {
      where: {
        AND: [
          { storeId: storeDetails.storeId },
          { livemode: storeDetails.livemode },
        ],
      },
      take: +limit + 1,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        prices: expand?.includes('prices') || false,
      },
    };

    if (startingAfter) {
      query.cursor = {
        id: startingAfter,
      };
      query.skip = 1;
    }

    const products = await this.prismaService.product.findMany(query);
    const hasMore = products.length > limit;

    const data = hasMore ? products.slice(0, -1) : products;

    return {
      object: 'list',
      url: '/v1/products',
      has_more: hasMore,
      data: data,
    };
  }

  async findOne(
    id: string,
    storeDetails: { storeId: string; livemode: boolean },
  ) {
    const product = await this.prismaService.product.findFirst({
      where: {
        AND: [
          { id },
          { livemode: storeDetails.livemode },
          { storeId: storeDetails.storeId },
        ],
      },
      include: { prices: true },
    });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });

    return product;
  }

  async remove(id: string) {
    const product = await this.prismaService.product.delete({
      where: { id },
    });

    return product;
  }
}
