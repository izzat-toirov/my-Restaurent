import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Reservation ID' })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  reservation_id: number;

  @ApiProperty({ example: 120000.50, description: 'Payment amount' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: PaymentMethod.CASH,
    enum: PaymentMethod,
    description: 'Payment method (cash or card)',
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @ApiProperty({
    example: PaymentStatus.PENDING,
    enum: PaymentStatus,
    description: 'Payment status (pending, paid, failed)',
  })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  payment_status: PaymentStatus;

  @ApiProperty({ example: 20250708, description: 'Paid date in YYYYMMDD format' })
  @IsInt()
  @Min(20200101)
  @IsNotEmpty()
  paid_at: number;
}
