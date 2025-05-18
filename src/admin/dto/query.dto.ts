import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from 'src/common/enum/order.enum';

export class QueryDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  role?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  sortBy?: string;

  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;
}
