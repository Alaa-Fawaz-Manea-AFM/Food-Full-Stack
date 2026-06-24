import {
  ParseUUIDPipe,
  Controller,
  Delete,
  Patch,
  Param,
  Post,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import RolesDecorator from '../decorator/roles.decorator';
import AuthDecorator from '../decorator/auth.decorator';
import { CategoryService } from './category.service';
import { ADMIN } from '../utils/constant';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @AuthDecorator()
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @RolesDecorator(ADMIN)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @RolesDecorator(ADMIN)
  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @RolesDecorator(ADMIN)
  @Delete(':categoryId')
  deleteCategory(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
