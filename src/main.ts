import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
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
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
