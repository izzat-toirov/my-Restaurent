import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuImageDto {
  @ApiProperty({ example: 1, description: 'Menu ID raqami' })
  @IsNumber()
  @Type(() => Number)
  menu_id: number;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
    description: 'Post rasmi (image)',
  })
  @IsOptional()
  image?: any;
}
