import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID raqami' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 3, description: 'Restoran ID raqami' })
  @IsInt()
  restaurant_id: number;

  @ApiProperty({ example: 5, description: 'Baholash (1 dan 5 gacha)' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Juda yaxshi xizmat!', description: 'Izoh matni' })
  @IsString()
  comment: string;
}
