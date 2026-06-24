import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
