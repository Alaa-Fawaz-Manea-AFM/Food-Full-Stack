import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/updateProduct.dto';
import ParamsDto from '../validators/params.dto';
import { GetAllProductDto } from './dto/get.all.Product.dto';
import RolesDecorator from '../decorator/roles.decorator';
import AuthDecorator from '../decorator/auth.decorator';
import { ADMIN } from '../utils/constant';
import { CreateProductDto } from './dto/create.Product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @AuthDecorator()
  @Get()
  getAllproducts(@Query() getAllProductDto: GetAllProductDto, @Req() req: any) {
    return this.productService.getAllProducts(
      getAllProductDto,
      req.user?.userId,
    );
  }

  @AuthDecorator()
  @Get(':productId')
  getproduct(@Param() ParamsDto: ParamsDto, @Req() req: any) {
    return this.productService.getProduct(
      ParamsDto.productId,
      req.user?.userId,
    );
  }

  @RolesDecorator(ADMIN)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    return this.productService.createProduct(createProductDto, req.user.userId);
  }

  @RolesDecorator(ADMIN)
  @Patch(':productId')
  updateProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: any,
  ) {
    return this.productService.updateProduct(
      productId,
      req.user.userId,
      updateProductDto,
    );
  }

  @RolesDecorator(ADMIN)
  @Delete(':productId')
  deleteProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req: any,
  ) {
    return this.productService.deleteProduct(productId, req.user.userId);
  }
}
