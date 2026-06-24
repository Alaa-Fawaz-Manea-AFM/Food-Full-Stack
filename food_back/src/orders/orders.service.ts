import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import sendResponsive from 'src/utils/sendResponsive';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId, userId },

      include: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                price: true,
                imageCover: true,
              },
            },
          },
        },
      },
    });
    return sendResponsive(order, 'orders retrieved successfully');
  }

  async getMyOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },

      include: {
        items: {
          include: {},
        },
      },
    });

    return sendResponsive(orders, 'orders retrieved successfully');
  }

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const { items, paymentMethod } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Your cart is empty.');
    }

    let totalCalculatedPrice = 0;

    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found.`,
        );
      }

      totalCalculatedPrice += product.price;
    }

    const newOrder = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalPrice: totalCalculatedPrice,
          paymentMethod: paymentMethod as PaymentMethod,
          status: OrderStatus.PENDING,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      await tx.cart.deleteMany({
        where: { userId },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          cartCounts: {
            set: 0,
          },
        },
      });

      return order;
    });

    return {
      message: 'Order created successfully',
      data: newOrder,
    };
  }
}
