import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListResponse } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: any) {
    const apiKey = req.headers['secret_key'];
    return this.productsService.create(createProductDto, apiKey);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Request() req: any,
  ): Promise<ProductListResponse> {
    const apiKey = req.headers['secret_key'];
    return await this.productsService.findAll(query, apiKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.remove(id);
    return {
      id: product.id,
      object: product.object,
      deleted: true,
    };
  }
}
