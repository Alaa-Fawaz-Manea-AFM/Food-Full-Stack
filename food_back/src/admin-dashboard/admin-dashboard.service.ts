import { GetAllProductAdminDto } from './dto/GetAllProductAdmin.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      this.prisma.order.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          status: true,
          paymentMethod: true,
          totalPrice: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      this.prisma.order.count(),
    ]);

    return sendResponsive(
      {
        meta: {
          totalPages: Math.ceil(totalOrders / limit),
          page,
        },
        orders,
      },
      'Get All Orders successfully',
    );
  }

  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, totalPages] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          role: Role.USER,
        },
        take: limit,
        skip,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({
        where: {
          role: Role.USER,
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
        users,
      },
      'Get All Users successfully',
    );
  }

  async getProduct(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        desc: true,
        imageCover: true,
        price: true,
        category: {
          select: {
            id: true,
            category: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('product not found');

    return sendResponsive(product, 'product retrieved successfully');
  }

  async getAllProducts(getAllProductAdminDto: GetAllProductAdminDto) {
    const { search, page = 1, limit = 10 } = getAllProductAdminDto;

    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        desc: {
          contains: search,
          mode: 'insensitive',
        },
      }),
      isDeleted: false,
    };

    const [products, totalPages] = await Promise.all([
      this.prisma.product.findMany({
        where,
        take: limit,
        skip,

        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          imageCover: true,
          price: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              category: true,
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return sendResponsive(
      {
        meta: {
          totalPages: Math.ceil(totalPages / limit),
          page,
          limit,
        },
        products,
      },
      'products retrieved successfully',
    );
  }

  async findAllProductAndOrdersAndUsersCounts() {
    const [productCounts = 0, orderCounts = 0, userCounts] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.user.count(),
    ]);
    return sendResponsive(
      {
        productCounts,
        orderCounts,
        userCounts,
      },
      'Admin dashboard data fetched successfully',
    );
  }
}
