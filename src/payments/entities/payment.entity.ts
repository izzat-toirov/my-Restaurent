import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Reservation } from '../../reservations/entities/reservation.entity';
  
  // ENUM tiplar
  export enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
  }
  
  export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
  }
  
  interface IPayment {
    reservation_id: number;
    amount: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    paid_at: number;
  }
  
  @Table({ tableName: 'payments', timestamps: false })
  export class Payment extends Model<Payment, IPayment> {
    @ForeignKey(() => Reservation)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare reservation_id: number;
  
    @Column({
      type: DataType.DECIMAL(15, 2),
      allowNull: false,
    })
    declare amount: number;
  
    @Column({
      type: DataType.ENUM('cash', 'card'),
      allowNull: false,
    })
    declare payment_method: PaymentMethod;
  
    @Column({
      type: DataType.ENUM('pending', 'paid', 'failed'),
      allowNull: false,
    })
    declare payment_status: PaymentStatus;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare paid_at: number;
  
    @BelongsTo(() => Reservation)
    declare reservation: Reservation;
  }
  