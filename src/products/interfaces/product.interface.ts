import { Prisma, Product } from '@prisma/client';

export interface ProductListResponse {
  object: string;
  url: string;
  has_more: boolean;
  data: Product[];
}

export interface FindManyProductQuery {
  take?: number;
  skip?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  include?: Prisma.ProductInclude;
  where?: Prisma.ProductWhereInput;
}
