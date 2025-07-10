import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMenuCategoryDto {
  @ApiProperty({ example: 'Ichimliklar', description: 'Kategoriya nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Sovuq va issiq ichimliklar', description: 'Kategoriya tavsifi', required: false })
  @IsOptional()
  @IsString()
  description: string;
}
