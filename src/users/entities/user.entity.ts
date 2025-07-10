import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface IUserCreationAttrs {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  role?: string;
  is_active?: boolean;
  refresh_token?: string;
  activation_link?: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}


@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.ENUM('SUPER_ADMIN', 'ADMIN', 'CUSTOMER', 'MANAGER'),
    defaultValue: 'CUSTOMER',
  })
  declare role: string;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING(2000),
  })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

}
