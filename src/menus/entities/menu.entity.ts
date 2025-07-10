
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Restaurants } from '../../restaurants/entities/restaurant.entity';
import { MenuCategory } from '../../menu-category/entities/menu-category.entity';

interface IMenu {
  restaurant_id:number;
  category_id: number;
  name: string;
  description: string;
  price: number;
}
@Table({ tableName: 'menus' })
export class Menus extends Model<Menus, IMenu> {
    @ForeignKey(() => Restaurants)
   @Column({
        type: DataType.INTEGER,
    })
    declare restaurant_id: number;

    @ForeignKey(() => MenuCategory)
  @Column({
      type: DataType.INTEGER,
    })
    declare category_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
})
declare price: number;


  @BelongsTo(() => Restaurants)
  restaurants_id  = Restaurants;
  @BelongsTo(() => MenuCategory)
  menuCategory_id  = MenuCategory;
}
