import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 1, description: 'Restoran ID raqami' })
  @IsInt()
  restaurent_id: number;

  @ApiProperty({ example: 10, description: 'Stol raqami' })
  @IsInt()
  table_number: number;

  @ApiProperty({ example: 4, description: 'Stol sig‘imi (nechta odam sig‘adi)' })
  @IsInt()
  @Min(1)
  capacity: number;
}
