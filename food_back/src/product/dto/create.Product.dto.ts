import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsUrl,
  IsInt,
  Min,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { Trim } from '../../validators/is-in-set.validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @Trim()
  @IsString({ message: 'title is required' })
  @MinLength(3, { message: 'title must be at least 3 characters' })
  @MaxLength(500, { message: 'title must be less than 500 characters' })
  title!: string;

  @Trim()
  @IsString({ message: 'title is required' })
  @MinLength(3, { message: 'desc must be at least 3 characters' })
  @MaxLength(500, { message: 'desc must be less than 500 characters' })
  desc!: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price must be a number (can include decimals)' })
  @Min(1, { message: 'price must be at least 1' })
  price!: number;

  @IsUrl()
  imageCover!: string;

  @IsUUID()
  categoryId!: string;
}
