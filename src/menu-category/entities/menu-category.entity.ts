

import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IMenuCategory {
  name: string;
  description: string;
}
@Table({ tableName: 'menuCategory' })
export class MenuCategory extends Model<MenuCategory, IMenuCategory> {
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;
}
