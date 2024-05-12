import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreatePriceWithProductDto } from 'src/prices/dto/create-price-with-product.dto';

export class CreateProductDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsArray()
  features?: string[];

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsDefined({ message: 'default_price_data is missing' })
  @Type(() => CreatePriceWithProductDto)
  @ValidateNested()
  default_price_data: CreatePriceWithProductDto;
}
