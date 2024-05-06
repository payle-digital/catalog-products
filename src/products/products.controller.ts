import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListResponse } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import Payle from 'payle';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: Payle.ProductCreateParams) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query() query: Payle.ProductListParams,
  ): Promise<ProductListResponse> {
    return await this.productsService.findAll(query);
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
