import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('my-orders')
  myOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user.userId);
  }

  @Get(':orderId')
  Orders(@Param('orderId', ParseUUIDPipe) orderId: string, @Req() req: any) {
    return this.ordersService.getOrder(req.user.userId, orderId);
  }

  @Post()
  create(@Req() req: any, @Body() body) {
    return this.ordersService.createOrder(req.user.userId, body);
  }
}
