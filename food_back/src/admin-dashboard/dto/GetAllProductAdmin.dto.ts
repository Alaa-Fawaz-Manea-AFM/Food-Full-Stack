import { PickType } from '@nestjs/mapped-types';
import { GetAllProductDto } from '../../product/dto/get.all.Product.dto';

export class GetAllProductAdminDto extends PickType(GetAllProductDto, [
  'search',
  'page',
  'limit',
]) {}
