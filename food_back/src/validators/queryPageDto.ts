import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export default class QueryPageDto {
  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  @Min(1)
  @Max(100)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt({ message: 'limit must be an integer' })
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;
}
