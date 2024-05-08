import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreatePriceDto } from 'src/prices/dto/create-price.dto';

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

  @IsOptional()
  default_price_data?: CreatePriceDto;
}
