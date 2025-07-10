import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 1, description: 'Restoran IDsi' })
  @IsNumber()
  @IsNotEmpty()
  restaurant_id: number;

  @ApiProperty({ example: 2, description: 'Kategoriya IDsi (masalan, "Ichimliklar")' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({ example: 'Lagʻmon', description: 'Taom nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Qoʻzoq goʻshti va sabzavotlar bilan', description: 'Taom tavsifi' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 25000, description: 'Narxi (so‘mda)' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;
}
