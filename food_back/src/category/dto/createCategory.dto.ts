import { IsString, MinLength, MaxLength } from 'class-validator';
import { Trim } from '../../validators/is-in-set.validator';

export class CreateCategoryDto {
  @Trim()
  @IsString({ message: 'category is required' })
  @MinLength(3, { message: 'category must be at least 3 characters' })
  @MaxLength(100, { message: 'category must be less than 100 characters' })
  category!: string;
}
