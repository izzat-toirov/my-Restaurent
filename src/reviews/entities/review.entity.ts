import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { User } from '../../users/entities/user.entity';
  import { Restaurants } from '../../restaurants/entities/restaurant.entity';
  
  interface IReview {
    user_id: number;
    restaurant_id: number;
    rating: number;
    comment: string;
  }
  
  @Table({ tableName: 'review' })
  export class Review extends Model<Review, IReview> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;
  
    @ForeignKey(() => Restaurants)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare restaurant_id: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare rating: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    declare comment: string;
  
    @BelongsTo(() => User)
    declare user: User;
  
    @BelongsTo(() => Restaurants)
    declare restaurant: Restaurants;
  }
  