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

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        id: `prod_${generateRandomId(14)}`,
        storeId: '',
        ...createProductDto,
      },
    });

    return product;
  }

  async findAll(queryDto: QueryProductDto): Promise<ProductListResponse> {
    const { expand, startingAfter, limit = 10 } = queryDto;

    const query: FindManyProductQuery = {
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
