import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: { category: 'asc' },
      select: {
        id: true,
        category: true,
      },
    });

    return sendResponsive(categories, 'Categories retrieved successfully');
  }

  async createCategory(dataCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findFirst({
      where: {
        category: dataCategoryDto.category,
      },
    });

    if (exists) {
      if (exists.isDeleted) {
        const restored = await this.prisma.category.update({
          where: {
            id: exists.id,
          },
          data: {
            isDeleted: false,
          },
        });

        return sendResponsive(restored, 'Category restored successfully');
      }

      throw new BadRequestException('Category already exists');
    }

    const newCategory = await this.prisma.category.create({
      data: dataCategoryDto,
    });

    return sendResponsive(newCategory, 'Category created successfully');
  }
  async updateCategory(categoryId: string, data: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });

    return sendResponsive(null, 'Category updated successfully');
  }

  async deleteCategory(categoryId: string) {
    await this.prisma.category.update({
      where: { id: categoryId },
      data: { isDeleted: true },
    });

    return sendResponsive(null, 'category deleted successfully');
  }
}
