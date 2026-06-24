import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllProductDto } from './dto/get.all.Product.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create.Product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(productId: string, userId?: string) {
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
        ...(userId && {
          cart: {
            where: { userId },
            select: {
              id: true,
            },
          },
        }),
      },
    });

    if (!product) throw new NotFoundException('product not found');
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: product.category.id,
        id: { not: product.id },
      },
      select: {
        id: true,
        title: true,
        desc: true,
        imageCover: true,
        price: true,
      },
    });

    const { cart = [], ...reset } = product;
    return sendResponsive(
      {
        product: {
          ...reset,
          isLiked: cart.length > 0,
        },
        products,
      },
      'product retrieved successfully',
    );
  }

  async getAllProducts(getAllProductDto: GetAllProductDto, userId?: string) {
    const { categoryId, search, page = 1, limit = 2 } = getAllProductDto;

    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {
      ...(categoryId && {
        categoryId,
      }),
      ...(search && {
        title: {
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
          ...(userId && {
            cart: {
              where: { userId },
            },
          }),
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
        products: products.map((product) => {
          const { cart = [], ...reset } = product;
          return {
            ...reset,
            isCart: cart.length > 0,
          };
        }),
      },
      'products retrieved successfully',
    );
  }

  async createProduct(dataProductsDto: CreateProductDto, userId: string) {
    const newproduct = await this.prisma.product.create({
      data: { ...dataProductsDto, userId },
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

    return sendResponsive(newproduct, 'product created successfully');
  }

  async updateProduct(
    productId: string,
    userId: string,
    data: UpdateProductDto,
  ) {
    await this.prisma.product.update({
      where: {
        id_userId: {
          id: productId,
          userId,
        },
      },
      data,
      select: {
        id: true,
      },
    });

    return sendResponsive(null, 'product updated successfully');
  }

  async deleteProduct(productId: string, userId: string) {
    await this.prisma.product.update({
      where: { id_userId: { id: productId, userId } },
      data: { isDeleted: true },
    });
    return sendResponsive(null, 'product deleted successfully');
  }
}
