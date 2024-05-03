import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

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
}
