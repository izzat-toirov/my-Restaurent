import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Menus } from '../../menus/entities/menu.entity';

interface IMenuImage {
  menu_id: number;
  image: string;
}
@Table({ tableName: 'menuImag' })
export class MenuImage extends Model<MenuImage, IMenuImage> {
  @ForeignKey(()=> Menus)
  @Column({
    type: DataType.INTEGER,
  })
  declare menu_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;


  @BelongsTo(() => Menus)
  declare menus: Menus;
}
