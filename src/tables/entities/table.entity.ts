
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Restaurants } from '../../restaurants/entities/restaurant.entity';

interface ITables {
  restaurent_id: number;
  table_number: number;
  capacity: number;
}
@Table({ tableName: 'tables' })
export class Tables extends Model<Tables, ITables> {
  @ForeignKey(()=> Restaurants)
  @Column({
    type: DataType.INTEGER,
  })
  declare restaurent_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare table_number: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare capacity: number;

  @BelongsTo(() => Restaurants)
  restaurants_id  = Restaurants;
}
