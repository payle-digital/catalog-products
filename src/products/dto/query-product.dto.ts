import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? value.split(',') : []))
  expand?: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  startingAfter?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;
}
