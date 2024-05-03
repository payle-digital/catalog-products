import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
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
