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

interface INotification {
  user_id: number;
  message: string;
}

@Table({ tableName: 'notification' })
export class Notification extends Model<Notification, INotification> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare message: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_read: boolean;
  

  @BelongsTo(() => User)
  users_id: User;
}
