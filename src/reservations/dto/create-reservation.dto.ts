import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID raqami' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 5, description: 'Band qilinayotgan stol IDsi' })
  @IsInt()
  table_id: number;

  @ApiProperty({ example: '2025-07-10', description: 'Bandlov sanasi (YYYY-MM-DD)' })
  @IsDateString()
  reservation_date: string;

  @ApiProperty({ example: '18:30', description: 'Bandlov vaqti (HH:mm)' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'reservation_time HH:mm formatda bo‘lishi kerak' })
   reservation_time: string;

  @ApiProperty({ example: 4, description: 'Mehmonlar soni' })
  @IsInt()
  @Min(1)
  guests_count: number;

  @ApiProperty({ example: true, description: 'Bandlov tasdiqlanganmi' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
