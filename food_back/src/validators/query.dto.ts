import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { Trim } from './is-in-set.validator';
import QueryPageDto from './queryPageDto';

export default class QueryDto extends QueryPageDto {
  @IsOptional()
  @IsUUID()
  postId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class QuerySearchDto {
  @IsOptional()
  @Trim()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  caption?: string;
}
