import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    PrismaModule, 
    ProductsModule, 
    PricesModule, 
    StoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
