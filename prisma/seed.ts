import { faker } from '@faker-js/faker';
import {
  BillingScheme,
  Currency,
  PriceType,
  PrismaClient,
} from '@prisma/client';
import { generateRandomId } from '../src/utils/generateRandomId';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  console.log(`Start seeding ...`);

  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        id: `prod_${generateRandomId(14)}`,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        images: [faker.image.imageUrl(), faker.image.imageUrl()],
        features: [faker.commerce.productMaterial(), faker.commerce.product()],
        object: 'product',
        accountId: '',
      },
    });
    console.log(`Created product with id: ${product.id}`);

    const price = await prisma.price.create({
      data: {
        id: `price_${generateRandomId(14)}`,
        accountId: '',
        currency: faker.helpers.arrayElement(Object.values(Currency)),
        active: faker.datatype.boolean(),
        productId: product.id,
        recurring: faker.datatype.boolean()
          ? {
              interval: faker.helpers.arrayElement([
                'day',
                'week',
                'month',
                'year',
              ]),
              interval_count: faker.datatype.number({ min: 1, max: 12 }),
              usage_type: faker.helpers.arrayElement(['metered', 'licensed']),
            }
          : null,
        unitAmount: faker.datatype.boolean()
          ? faker.datatype.number({ min: 100, max: 10000 })
          : null,
        billingScheme: BillingScheme.per_unit,
        type: faker.helpers.arrayElement(Object.values(PriceType)),
      },
    });
    console.log(
      `Created price with id: ${price.id} for product id: ${product.id}`,
    );
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
