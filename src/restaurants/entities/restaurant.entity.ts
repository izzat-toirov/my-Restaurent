export class Restaurant {}
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Menus } from '../../menus/entities/menu.entity';

interface IRestaurants {
  name: string;
  description: string;
  address: string;
  phone_number: string;
  start_date: Date;
  end_date: Date;
}
@Table({ tableName: 'restaurants' })
export class Restaurants extends Model<Restaurants, IRestaurants> {
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;


  @HasMany(() => Menus)
  declare menus: Menus[];

  @Column({
    type: DataType.DATE,
    defaultValue: () => {
      const date = new Date();
      date.setHours(9, 0, 0, 0);
      return date;
    },
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: () => {
      const date = new Date();
      date.setHours(24, 0, 0, 0);
      return date;
    },
  })
  declare end_date: Date;
}
