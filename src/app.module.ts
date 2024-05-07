import { Module } from '@nestjs/common';
import { PricesModule } from './prices/prices.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [PrismaModule, ProductsModule, PricesModule, StoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
