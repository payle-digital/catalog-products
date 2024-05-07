import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createProductDto: CreateProductDto, apiKey: string) {
    const store = await this.prismaService.store.findFirst({
      where: { apiKey },
    });

    if (!store) new NotFoundException();

    const product = await this.prismaService.product.create({
      data: {
        id: `prod_${generateRandomId(14)}`,
        storeId: store.id,
        ...createProductDto,
      },
    });

    return product;
  }

  async findAll(
    queryDto: QueryProductDto,
    apiKey: string,
  ): Promise<ProductListResponse> {
    const store = await this.prismaService.store.findFirst({
      where: { apiKey },
    });

    if (!store) new NotFoundException();

    const { expand, startingAfter, limit = 10 } = queryDto;

    const query: FindManyProductQuery = {
      where: { storeId: store.id },
      take: limit + 1,
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

  async findOne(id: string) {
    const product = await this.prismaService.product.findFirst({
      where: { id },
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
