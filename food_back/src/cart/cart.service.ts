import QueryPageDto from '../validators/queryPageDto';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCarts(userId: string, query: QueryPageDto) {
    const { page = 1, limit = 9 } = query;

    const skip = (page - 1) * limit;
    const [carts, totalPages] = await Promise.all([
      this.prisma.cart.findMany({
        where: {
          userId,
        },
        select: {
          product: {
            select: {
              id: true,
              title: true,
              imageCover: true,
              price: true,
            },
          },
        },
        take: limit,
        skip,
      }),
      this.prisma.cart.count({
        where: {
          userId,
        },
      }),
    ]);

    return sendResponsive(
      {
        meta: {
          totalPages: Math.ceil(totalPages / limit),
          page,
          limit,
        },
        carts,
      },
      'Get All Carts Successfully',
    );
  }

  async toggleCarts(productId: string, userId: string) {
    return this.prisma.$transaction(async (prisma) => {
      const existingLike = await prisma.cart.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      const wasLiked = !!existingLike;
      const isNowLiked = !wasLiked;

      if (wasLiked) {
        await Promise.all([
          await prisma.cart.delete({
            where: {
              userId_productId: {
                userId,
                productId,
              },
            },
          }),
          await prisma.user.update({
            where: { id: userId },
            data: {
              cartCounts: {
                decrement: 1,
              },
            },
          }),
        ]);
      } else {
        await Promise.all([
          await prisma.cart.create({
            data: {
              userId,
              productId,
            },
          }),
          await prisma.user.update({
            where: { id: userId },
            data: {
              cartCounts: {
                increment: 1,
              },
            },
          }),
        ]);
      }

      return sendResponsive(
        isNowLiked,
        `Product ${isNowLiked ? 'Cart' : 'unCart'} successfully`,
      );
    });
  }
}
