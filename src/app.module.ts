import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';

@Module({
  imports: [PrismaModule, ProductsModule, PricesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
