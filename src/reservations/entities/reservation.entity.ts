
import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Tables } from '../../tables/entities/table.entity';

interface IReservation {
    user_id: number;
    table_id: number;
    reservation_date: string;
    reservation_time: string; 
    guests_count: number; 
    status?: boolean;
  }
  

  @Table({ tableName: 'reservation' })
  export class Reservation extends Model<Reservation, IReservation> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;
  
    @ForeignKey(() => Tables)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare table_id: number;
  
    @Column({ type: DataType.DATEONLY, allowNull: false })
    declare reservation_date: Date;
  
    @Column({ type: DataType.TIME, allowNull: false })
    declare reservation_time: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare guests_count: number;
  
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare status: boolean;
  
    @BelongsTo(() => User)
    declare user: User;
  
    @BelongsTo(() => Tables)
    declare table: Tables;
  }
  
  
