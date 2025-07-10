import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Lazzat Restaurant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Milliy taomlar va oilaviy xizmatlar' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Toshkent, Chilonzor tumani, Katta ko‘cha 15-uy' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;


  @ApiPropertyOptional({ example: '2025-01-01T09:00:00.000Z', description: 'Ish boshlanish vaqti (default: 09:00)' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z', description: 'Ish tugash vaqti (default: 24:00 -> 00:00 next day)' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date: Date;
}
