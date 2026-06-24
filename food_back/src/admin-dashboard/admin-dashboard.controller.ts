import { GetAllProductAdminDto } from './dto/GetAllProductAdmin.dto';
import { AdminDashboardService } from './admin-dashboard.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import QueryPageDto from '../validators/queryPageDto';
import ParamsDto from '../validators/params.dto';
import { ADMIN } from 'src/utils/constant';
import RolesDecorator from 'src/decorator/roles.decorator';

@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @RolesDecorator(ADMIN)
  @Get('users')
  getAllUsers(@Query() queryPageDto: QueryPageDto) {
    return this.adminDashboardService.getAllUsers(
      queryPageDto.page,
      queryPageDto.limit,
    );
  }

  @RolesDecorator(ADMIN)
  @Get('orders')
  getAllOrders(@Query() queryPageDto: QueryPageDto) {
    return this.adminDashboardService.getAllOrders(
      queryPageDto.page,
      queryPageDto.limit,
    );
  }

  @RolesDecorator(ADMIN)
  @Get('products')
  getAllProducts(@Query() getAllProductAdminDto: GetAllProductAdminDto) {
    return this.adminDashboardService.getAllProducts(getAllProductAdminDto);
  }

  @RolesDecorator(ADMIN)
  @Get(':productId')
  getproduct(@Param() ParamsDto: ParamsDto) {
    return this.adminDashboardService.getProduct(ParamsDto.productId);
  }

  @RolesDecorator(ADMIN)
  @Get()
  findAllProductAndOrdersAndUsersCounts() {
    return this.adminDashboardService.findAllProductAndOrdersAndUsersCounts();
  }
}
