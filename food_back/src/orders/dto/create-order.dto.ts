import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['CASH', 'Online'])
  paymentMethod!: 'ONLINE' | 'CASH';

  @IsArray()
  @IsNotEmpty()
  items!: OrderItemDto[];
}

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;
}
