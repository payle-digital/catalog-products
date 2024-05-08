import { BillingScheme, Currency, PriceType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreatePriceDto {
  @IsEnum(Currency)
  currency: Currency;

  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @IsString()
  productId: string;

  @IsOptional()
  @IsJSON()
  recurring?: any;

  @ValidateIf((o) => o.billingScheme === BillingScheme.per_unit)
  @IsInt()
  @Min(0)
  unitAmount?: number;

  @IsEnum(BillingScheme)
  billingScheme: BillingScheme;

  @IsEnum(PriceType)
  type: PriceType;
}
