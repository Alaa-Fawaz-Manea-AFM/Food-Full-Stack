import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Trim } from '../../validators/is-in-set.validator';
import QueryPageDto from '../../validators/queryPageDto';
import { Transform } from 'class-transformer';

export class GetAllProductDto extends QueryPageDto {
  @IsOptional()
  @Trim()
  @Transform(({ value }) => value.toLowerCase())
  @IsString({ message: 'title is required' })
  @MaxLength(100, { message: 'title must be less than 100 characters' })
  search?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxPrice?: number;
}
