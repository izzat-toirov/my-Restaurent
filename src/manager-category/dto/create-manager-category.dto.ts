import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateManagerCategoryDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 5, description: 'Restaurant ID' })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  restaurent_id: number;

  @ApiProperty({ example: 20250708, description: 'Assigned date in YYYYMMDD format' })
  @IsInt()
  @Min(20200101)
  @IsNotEmpty()
  assigned_at: number;
}
