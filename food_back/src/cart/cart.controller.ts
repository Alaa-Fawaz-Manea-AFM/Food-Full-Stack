import {
  Controller,
  ParseUUIDPipe,
  Param,
  Post,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import QueryPageDto from '../validators/queryPageDto';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getAllCarts(@Req() req: any, @Query() query: QueryPageDto) {
    return this.cartService.getCarts(req.user.userId, query);
  }

  @Post(':cartId')
  ToggleCarts(@Param('cartId', ParseUUIDPipe) cartId: string, @Req() req: any) {
    return this.cartService.toggleCarts(cartId, req.user.userId);
  }
}
