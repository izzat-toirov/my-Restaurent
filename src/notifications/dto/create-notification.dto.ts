import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 'Sizga yangi xabar bor', description: 'Xabar matni' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
