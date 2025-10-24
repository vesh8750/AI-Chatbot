import { PrismaClient, type Product } from "../generated/prisma";

const prisma = new PrismaClient();

const getProduct = async (productId: number): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: { id: productId },
  });
};

export const productRepository = {
  getProduct,
};
