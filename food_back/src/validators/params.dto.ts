import { IsUUID } from 'class-validator';

export default class ParamsDto {
  @IsUUID()
  productId!: string;
}
