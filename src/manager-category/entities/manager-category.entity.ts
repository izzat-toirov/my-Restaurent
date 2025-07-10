import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Restaurants } from '../../restaurants/entities/restaurant.entity';
  import { User } from '../../users/entities/user.entity';
  
  interface IManagerCategory {
    user_id: number;
    restaurent_id: number;
    assigned_at: number;
  }
  
  @Table({ tableName: 'manager_categories', timestamps: false })
  export class ManagerCategory extends Model<ManagerCategory, IManagerCategory> {
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare user_id: number;
  
    @ForeignKey(() => Restaurants)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare restaurent_id: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare assigned_at: number;
  
    @BelongsTo(() => Restaurants)
    declare restaurant: Restaurants;
  
    @BelongsTo(() => User)
    declare user: User;
  }
  