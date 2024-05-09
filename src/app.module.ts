import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ApiKeysService } from './api-keys/api-keys.service';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { PricesController } from './prices/prices.controller';
import { PricesModule } from './prices/prices.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG_PRODUCTS_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['united-coyote-9526-us1-kafka.upstash.io:9092'],
            ssl: true,
            sasl: {
              mechanism: 'scram-sha-256',
              username:
                'dW5pdGVkLWNveW90ZS05NTI2JGE_fi8cQrfzZ9gksJkx07ns7wsJvgId7A2V5uw',
              password: 'Y2YxODZlODItOTM5MC00YjEwLTkzYmItNWIyOTBjZWEyNzM5',
            },
          },
          consumer: {
            groupId: 'catalog-products-consumer',
          },
        },
      },
    ]),
    PrismaModule,
    ProductsModule,
    PricesModule,
    StoresModule,
    ApiKeysModule,
  ],
  controllers: [AppController],
  providers: [ApiKeysService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(ProductsController, PricesController);
  }
}
