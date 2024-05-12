import { BillingScheme, Currency, PriceType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsJSON,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreatePriceWithProductDto {
  @IsEnum(Currency)
  currency: Currency;

  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @ValidateIf((o) => o.type === PriceType.recurring)
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
